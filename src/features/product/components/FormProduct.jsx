import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import useJwt from '~/hooks/useJwt';
import ProductValidation, { InitialValuesAdd, InitialValuesUpdate } from '../validation/ProductValidation';
import { useParams } from 'react-router-dom';
import useStatus from '~/hooks/useStatus';
import { getCheckBoxSizes } from '~/api/ApiCheckBox';
import { getSelectSubCategories } from '~/api/ApiSelect';
import { addProduct, getProductByCode, updateProduct } from '../services/ApiProduct';
import { useBlur } from '~/hooks';
import { Errors, Header, Input, InputGroup, InputImage, Label, Selection, Textarea } from '~/components/form';
import { Card } from '~/components/card';
import styles from '../style/Product.module.css';
import { useSelector } from 'react-redux';
import { errorProductSelector, loadingProductSelector, titleErrorProductSelector } from '~/redux/selectors';
import Loading from '~/components/loading';
import ListCheckBoxSize from './ListCheckBoxSize';
import { isParam } from '~/utils/CheckValue';
import { getValueNumber, getValueString } from '~/utils/HandleValue';
import { Forbidden } from '~/components/error';


const FormProduct = () => {

    const loadingSumbit = useSelector(loadingProductSelector);

    const error = useSelector(errorProductSelector);

    const msg = useSelector(titleErrorProductSelector);

    const { sku } = useParams();

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const { allStatus } = useStatus(accessToken, dispatch, axiosJwt);

    const [sizes, setSizes] = useState([]);

    const [categories, setCategories] = useState([]);

    const [valeSizes, setValueSizes] = useState([]);

    const [isLoadingPage, setIsLoadingPage] = useState(false);

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
        mode: "onSubmit",
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
            const allCategory = await getSelectSubCategories(accessToken, dispatch, axiosJwt);
            if (allCategory) {
                setCategories(allCategory);
            }
        }
        loadingCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingPage])

    const loadData = async () => {
        if (sku === null || !sku) {
            reset(InitialValuesAdd());
            setIsLoadingPage(true)
        } else {
            const product = await getProductByCode(sku, accessToken, dispatch, navigate, axiosJwt);
            if (product) {
                setIsLoadingPage(true)
                setValueSizes(product?.sizes);
                reset(InitialValuesUpdate(product));
            }
        }
    }

    const { handleBlur } = useBlur(setValue);


    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(
            data
        )], {
            type: "application/json"
        }));
        formData.append("image", data.image);

        if (isParam(sku)) {
            updateProduct(sku, formData, accessToken, dispatch, navigate, axiosJwt, setError)
        } else {
            addProduct(formData, accessToken, dispatch, navigate, axiosJwt, setError);
        }
    };

    // Error Forbidden 403
    if (error && !(!msg.trim())) return (
        <Card className='h-md-100'>
            <Forbidden msg={msg} />
        </Card>
    )

    if (!isLoadingPage) return;

    return (
        <>
            {
                loadingSumbit && <Loading />
            }
            <form className='form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
                    <Card className='py-4'>
                        <Header name={"Hình ảnh sản phẩm"} />
                        <div className='card-body text-center pt-0'>
                            <InputImage
                                name='image'
                                className={`image-input-outline mb-3 ${styles.image}`}
                                setError={setError}
                                setValue={setValue}
                                errors={errors?.image}
                                value={getValues('image')}
                            />
                            {errors.image && <Errors title={errors.image.message} />}
                        </div>
                    </Card>
                    <Card className='py-4'>
                        <Header name={"Trạng thái"}>
                            <div className='card-toolbar'>
                                <div className='rounded-circle bg-success w-15px h-15px'></div>
                            </div>
                        </Header>
                        <div className='card-body pt-0'>
                            <Selection options={allStatus}
                                name={"status"}
                                control={control}
                                value={getValues("status")}
                                placeholder='Chọn trạng thái sản phẩm'
                                noOptionsMessage='Không có trạng thái sản phẩm'
                            />
                            {errors.status && <Errors title={errors.status.message} />}
                        </div>
                    </Card>
                    <Card className='py-4'>
                        <Header name={"Loại sản phẩm"} />
                        <div className='card-body pt-0'>
                            <Selection options={categories}
                                name={"category"}
                                control={control}
                                value={getValues("category")}
                                placeholder='Chọn loại sản phẩm'
                                noOptionsMessage='Không có loại sản phẩm'
                            />
                            {errors.category && <Errors title={errors.category.message} />}
                        </div>
                    </Card>
                </div>
                <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
                    <div className='d-flex flex-column gap-7 gap-lg-10'>
                        <Card className='py-4'>
                            <Header name={"Tổng quát"} />
                            <div className='card-body pt-0'>
                                <InputGroup className={"mb-10"}>
                                    <Label title={'Tên sản phẩm'} />
                                    <Input
                                        className={'form-control mb-2'}
                                        type={'text'}
                                        name={'name'}
                                        placeholder={'Vui lòng nhập tên sản phẩm'}
                                        onBlur={handleBlur}
                                        values={getValueString(getValues('name'))}
                                    />
                                    {errors.name && <Errors title={errors.name.message} />}
                                </InputGroup>
                                <InputGroup className={"mb-10"}>
                                    <Label title={'Kí hiệu sản phẩm'} />
                                    <Input
                                        className={'form-control mb-2'}
                                        type={'text'}
                                        name={'sku'}
                                        placeholder={'Vui lòng kí hiệu sản phẩm'}
                                        onBlur={handleBlur}
                                        values={getValueString(getValues('sku'))}
                                    />
                                    {errors.sku && <Errors title={errors.sku.message} />}
                                </InputGroup>
                                <InputGroup className={"mb-10"}>
                                    <Label title={'Giá sản phẩm'} />
                                    <Input
                                        className={'form-control mb-2'}
                                        type={'number'}
                                        name={'price'}
                                        placeholder={'Vui lòng nhập giá sản phẩm'}
                                        onBlur={handleBlur}
                                        values={getValueNumber(getValues('price'))}
                                    />
                                    {errors.price && <Errors title={errors.price.message} />}
                                </InputGroup>
                                <InputGroup className={"mb-10"}>
                                    <Label title={'Mô tả sản phẩm'} />
                                    <Textarea
                                        className={'form-control-solid min-h-150px'}
                                        placeholder={'Vui lòng nhập nội dung sản phẩm'}
                                        name={'description'}
                                        onBlur={handleBlur}
                                        values={getValueString(getValues('description'))}
                                    />
                                    {errors.description && <Errors title={errors.description.message} />}
                                </InputGroup>
                            </div>
                        </Card>
                        <Card className='py-4'>
                            <Header name={"Kích thước sản phẩm"} />
                            <div className='card-body pt-0'>
                                <div className='row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9'>
                                    <ListCheckBoxSize
                                        options={sizes}
                                        register={{ ...register("sizes") }}
                                        setValue={setValue}
                                        getValues={getValues("sizes")}
                                        name={"sizes"}
                                        valeSizes={valeSizes}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className='btn btn-primary'>
                            <span className='indicator-label'>
                                Save Changes
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormProduct;
