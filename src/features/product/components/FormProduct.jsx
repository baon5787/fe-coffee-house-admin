import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '~/components/card'
import {
    Errors, Input, InputGroup,
    InputImage, Label, Selection, Textarea
} from '~/components/form'
import useJwt from '~/hooks/useJwt';
import useStatus from '~/hooks/useStatus';
import ProductValidation, { InitialProdctAdd, InitialProductUpdate } from '../validation/ProductValidation';
import { EMPTY_ARRAY } from '~/constants/AppConstant';
import { getSelectSubCategories } from '~/api/ApiSelect';
import { getCheckBoxSizes } from '~/api/ApiCheckBox';
import { addProduct, getProductByCode, updateProduct } from '../services/ApiProduct';
import { errorProductSelector, loadingProductSelector, titleErrorProductSelector } from '~/redux/selectors';
import { useSelector } from 'react-redux';
import Loading from '~/components/loading';
import { isParam } from '~/utils/CheckValue';
import { Forbidden } from '~/components/error';
import ListCheckBoxSize from './ListCheckBoxSize';

const FormProduct = () => {

    const loadingSumbit = useSelector(loadingProductSelector);

    const error = useSelector(errorProductSelector);

    const msg = useSelector(titleErrorProductSelector);

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const { sku } = useParams();

    const { allStatus } = useStatus();

    const [categories, setCategories] = useState(EMPTY_ARRAY);

    const [sizes, setSizes] = useState(EMPTY_ARRAY);

    const [isLoadingPage, setIsLoadingPage] = useState(false);

    const [valeSizes, setValueSizes] = useState(EMPTY_ARRAY);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        reset,
        control,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        reValidateMode: 'onBlur',
        resolver: yupResolver(ProductValidation(accessToken, axiosJwt, dispatch, sku,
            allStatus, categories))
    });

    useEffect(() => {
        const handleLoadingForm = async () => {
            if (!accessToken) return;
            loadData();
        }
        handleLoadingForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const loadingSize = async () => {
            if (!accessToken || !isLoadingPage) return;
            const allSize = await getCheckBoxSizes(accessToken, axiosJwt);
            if (allSize) {
                setSizes(allSize);
            }
        }
        loadingSize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingPage])

    useEffect(() => {
        const loadingCategory = async () => {
            if (!accessToken || !isLoadingPage) return;
            const allCategory = await getSelectSubCategories(accessToken, axiosJwt);
            if (allCategory) {
                setCategories(allCategory);
            }
        }
        loadingCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingPage]);

    const loadData = async () => {
        if (sku === null || !sku) {
            reset(InitialProdctAdd());
            setIsLoadingPage(true)
        } else {
            const product = await getProductByCode(sku, accessToken, dispatch, navigate,
                axiosJwt);
            if (product) {
                setIsLoadingPage(true)
                setValueSizes(product?.sizes);
                reset(InitialProductUpdate(product));
            }
        }
    }

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(
            data
        )], {
            type: "application/json"
        }));
        formData.append("image", data.image);

        if (isParam(sku)) {
            updateProduct(sku, formData, accessToken, dispatch, navigate, axiosJwt,
                setError);
        } else {
            addProduct(formData, accessToken, dispatch, navigate, axiosJwt, setError);
        }
    };

    // Error Forbidden 403
    if (error && !(!msg.trim())) return (
        <Card className='md:h-full'>
            <Forbidden msg={msg} />
        </Card>
    )

    if (!isLoadingPage) return;

    return (
        <>
            {
                loadingSumbit && <Loading />
            }
            <form className='flex flex-col lg:flex-row gap-7 lg:gap-10'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col gap-7 lg:gap-10 w-full lg:w-[300px]'>
                    <Card className={'!py-4 !border-card-none'}>
                        <CardHeader
                            name={'Thumbnail'}
                            className={'!border-bottom-card-none'}
                        />
                        <CardBody className={'!text-center !pt-0'}>
                            <InputImage
                                setError={setError}
                                setValue={setValue}
                                errors={errors?.image}
                                name='image'
                                value={getValues('image')}
                            />
                            {errors.image && <Errors title={errors.image.message} />}
                        </CardBody>
                    </Card>
                    <Card className={'!py-4 !border-card-none'}>
                        <CardHeader
                            name={'Trạng thái'}
                            className={'!border-bottom-card-none'}
                        />
                        <CardBody className={'!text-center !pt-0'}>
                            <Selection
                                options={allStatus}
                                name={"status"}
                                control={control}
                                value={getValues("status")}
                                placeholder='Chọn trạng thái sản phẩm'
                                noOptionsMessage='Không có trạng thái sản phẩm'
                            />
                            {errors.status && <Errors
                                title={errors.status.message}
                                className='text-start'
                            />}
                        </CardBody>
                    </Card>
                    <Card className={'!py-4 !border-card-none'}>
                        <CardHeader
                            name={'Loại sản phẩm'}
                            className={'!border-bottom-card-none'}
                        />
                        <CardBody className={'!text-center !pt-0'}>
                            <Selection
                                options={categories}
                                name={"category"}
                                control={control}
                                value={getValues("category")}
                                placeholder='Chọn loại sản phẩm'
                                noOptionsMessage='Không có loại sản phẩm'
                            />
                            {errors.category && <Errors
                                title={errors.category.message}
                                className='text-start'
                            />}
                        </CardBody>
                    </Card>
                </div>
                <div className='flex flex-col gap-7 lg:gap-10 flex-[1_auto] min-w-0'>
                    <Card className='py-4'>
                        <CardHeader
                            name={"Tổng quát"}
                            className={'!border-bottom-card-none'}
                        />
                        <CardBody className={'!pt-0'}>
                            <InputGroup className={'!mb-10'}>
                                <Label title={'Tên sản phẩm'} />
                                <Input
                                    className={'form-control mb-2'}
                                    type={'text'}
                                    placeholder={'Vui lòng nhập tên sản phẩm'}
                                    register={register('name')}
                                />
                                {errors.name && <Errors title={errors.name.message} />}
                            </InputGroup>
                            <InputGroup className={"mb-10"}>
                                <Label title={'Kí hiệu sản phẩm'} />
                                <Input
                                    className={'form-control mb-2'}
                                    type={'text'}
                                    placeholder={'Vui lòng kí hiệu sản phẩm'}
                                    register={register('sku')}
                                />
                                {errors.sku && <Errors title={errors.sku.message} />}
                            </InputGroup>
                            <InputGroup className={"mb-10"}>
                                <Label title={'Giá sản phẩm'} />
                                <Input
                                    className={'form-control mb-2'}
                                    type={'number'}
                                    placeholder={'Vui lòng nhập giá sản phẩm'}
                                    register={register('price')}
                                />
                                {errors.price && <Errors title={errors.price.message} />}
                            </InputGroup>
                            <InputGroup>
                                <Label title={'Mô tả sản phẩm'} />
                                <Textarea
                                    className={'form-control-solid !min-h-[200px]'}
                                    placeholder={'Vui lòng nhập nội dung sản phẩm'}
                                    register={register('description')}
                                />
                                {errors.description && <Errors title={errors.description.message} />}
                            </InputGroup>
                        </CardBody>
                    </Card>
                    <Card className='py-4'>
                        <CardHeader
                            name={"Kích thước sản phẩm"}
                            className={'!border-bottom-card-none'}
                        />
                        <CardBody className={'!pt-0'}>
                            <ListCheckBoxSize
                                className={'md:grid-cols-3 gap-9'}
                                options={sizes}
                                register={{ ...register("sizes") }}
                                setValue={setValue}
                                getValues={getValues("sizes")}
                                name={"sizes"}
                                valeSizes={valeSizes}
                            />
                            {errors.sizes && <Errors title={errors.sizes.message} />}
                        </CardBody>
                    </Card>
                    <div className='flex justify-end'>
                        <button className='btn btn-primary'>Save Changes</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormProduct