import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Errors, Input, InputDate, InputGroup, Label, Selection } from '~/components/form';
import { CloseIcon } from '~/components/icons';
import { Modal } from '~/components/modal'
import { useBlur, useModal, useParam } from '~/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { couponStatusSelector, userSelector } from '~/redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionSelect } from '~/utils/HandleValue';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/api/AxiosClient';
import { loginSucces } from '~/redux/slice/AuthSlice';
import { getSelectCouponCategories, getSelectCouponStatues, getSelectCouponTypes, getSelectProducts } from '~/api/ApiSelect';
import { DEFAULT_INDEX, END_DAY } from '~/constants/AppConstant';
import CouponValidation, { InitialCouponAdd, InitialCouponUpdate } from '../validation/CouponValidation';
import { addCoupon, getCouponByCode, updateCoupon } from '../services/ApiCoupon';
import { createPortal } from 'react-dom';
import { errorApi, errorForm } from '~/helper/AppString';
import { ERROR } from '~/constants/Paths';
import { swalMixin } from '~/components/swal/Swal';
import Selections from '~/components/form/Selections';
import { isEmptyArray, isObjectOneValue } from '~/utils/CheckValue';

const ModalFormCoupon = (props, ref) => {

    const { showing, openModal, closeModal } = useModal();

    const { param, setParam, resetParam } = useParam();

    useImperativeHandle(ref, () => ({
        addCoupon: () => {
            openModal();
            setParam();
        },
        editCoupon: (value) => {
            openModal();
            setParam(value);
        }
    }));

    const allStatus = useSelector(couponStatusSelector);

    const user = useSelector(userSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let axiosJwt = createAxios(user, dispatch, loginSucces, navigate);

    const [allCouponCategory, setAllCouponCategory] = useState([]);

    const [allCouponType, setAllCouponType] = useState([]);

    const [allProduct, setAllProduct] = useState([]);

    const [isTypePrice, setIsTypePrice] = useState(true);

    const [isCondition, setIsCondition] = useState(true);

    const {
        handleSubmit,
        getValues,
        setError,
        setValue,
        reset,
        control,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(CouponValidation(user?.accessToken, axiosJwt, dispatch, param,
            allCouponType, allStatus, allCouponCategory)),
    });

    useEffect(() => {
        const handleLoad = async () => {

            if (param === null) return;

            let statuses = allStatus;
            if (isEmptyArray(allStatus)) {
                const data = await getSelectCouponStatues(user?.accessToken, dispatch, axiosJwt);
                statuses = [...data];
            }

            const conponTypes = await getSelectCouponTypes(user?.accessToken, axiosJwt);

            const couponCategories = await getSelectCouponCategories(user?.accessToken, axiosJwt)

            const products = await getSelectProducts(user?.accessToken, axiosJwt)

            setAllCouponCategory(couponCategories);

            setAllCouponType(conponTypes);

            setAllProduct(products)

            loadData(param, statuses, couponCategories, conponTypes, products);
        }
        handleLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    useEffect(() => {
        setIsTypePrice(getValues('couponType') === 'MONEY');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues('couponType')])

    useEffect(() => {
        const CATEGORY_TOTAL = '1';
        setIsCondition(getValues('couponCategory') === CATEGORY_TOTAL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues('couponCategory')])

    const loadData = async (code, statuses, couponCategories, conponTypes, products) => {

        if (code !== null && code !== undefined) {
            const coupon = await getCouponByCode(code, user?.accessToken, dispatch, axiosJwt);
            reset(InitialCouponUpdate(coupon));
        } else {
            reset(InitialCouponAdd(statuses[DEFAULT_INDEX]?.value, products[DEFAULT_INDEX]?.value,
                couponCategories[DEFAULT_INDEX]?.value, conponTypes[DEFAULT_INDEX]?.value));
        }
    }

    const handleCloseModal = () => {
        closeModal();
        resetParam();
    }

    const onSubmit = async (data) => {

        let title;

        const couponCategory = getOptionSelect(allCouponCategory, data?.couponCategory);

        if (!isObjectOneValue(couponCategory)) return;

        if (!param || param === null) {
            title = await addCoupon(data, user?.accessToken, dispatch, axiosJwt, setError,
                couponCategory[DEFAULT_INDEX]?.label);
        } else {
            title = await updateCoupon(param, data, user?.accessToken, dispatch, axiosJwt,
                setError, couponCategory[DEFAULT_INDEX]?.label);
        }

        if (!title) {
            throw new Error(errorApi);
        }

        if (title === ERROR) {
            swalMixin().fire({
                icon: 'error',
                title: errorForm
            })
            return;
        }

        swalMixin().fire({
            icon: 'success',
            title: title
        })

        closeModal();
        resetParam();
    }

    const { handleBlur } = useBlur(setValue);


    if (!showing) return;

    return createPortal(
        <>
            <Modal>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='modal-header'>
                        <h2 className='fw-bold'>Add a Customer</h2>
                        <div className='btn btn-icon btn-sm btn-active-icon-primary'
                            onClick={handleCloseModal}
                        >
                            <span className='svg-icon svg-icon-1'>
                                <CloseIcon size={24} />
                            </span>
                        </div>
                    </div>
                    <div className='modal-body py-10 px-lg-17'>
                        <div className='scroll-y pe-7 mh-250px'>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Tên mã giảm giá'} />
                                <Input
                                    className={'form-control-solid mb-3 mb-lg-0'}
                                    type={'text'}
                                    name={'name'}
                                    placeholder={'Vui lòng nhập tên mã giảm giá'}
                                    onBlur={handleBlur}
                                    values={getValues("name") ? getValues("name") : ""}
                                />
                                {errors.name && <Errors title={errors.name.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Mã giảm giá'} />
                                <Input
                                    className={'form-control-solid mb-3 mb-lg-0'}
                                    type={'text'}
                                    name={'code'}
                                    placeholder={'Vui lòng nhập mã giảm giá'}
                                    onBlur={handleBlur}
                                    values={getValues("code") ? getValues("code") : ""}
                                />
                                {errors.code && <Errors title={errors.code.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Coupon Type'} />
                                <Selections options={allCouponType}
                                    name={"couponType"}
                                    value={getValues("couponType")}
                                    setValue={setValue}
                                />
                                {errors.couponType && <Errors title={errors.couponType.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'}
                                    title={`Giá giảm của mã giảm giá theo ${isTypePrice ? 'tiền' : 'phần trăm'}`}
                                />
                                <Input
                                    className={'form-control-solid mb-3 mb-lg-0'}
                                    type={'number'}
                                    name={'price'}
                                    placeholder={'Vui lòng nhập giá giảm'}
                                    onBlur={handleBlur}
                                    values={getValues("price") ? getValues("price") : 0}
                                />
                                {errors.price && <Errors title={errors.price.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Số lượng mã giảm giá trong một ngày'} />
                                <Input
                                    className={'form-control-solid mb-3 mb-lg-0'}
                                    type={'number'}
                                    name={'quantity'}
                                    placeholder={'Vui lòng số lượng mã giảm giá trong một ngày'}
                                    onBlur={handleBlur}
                                    values={getValues("quantity") ? getValues("quantity") : 0}
                                />
                                {errors.quantity && <Errors title={errors.quantity.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Hạn sử dụng mã giảm giá'} />
                                <InputDate
                                    value={getValues('expired')}
                                    name={'expired'}
                                    option={END_DAY}
                                    setValue={setValue}
                                />
                                {errors.expired && <Errors title={errors.expired.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Status'} />
                                <Selection options={allStatus}
                                    name={"status"}
                                    control={control}
                                    value={getValues("status")}
                                />
                                {errors.status && <Errors title={errors.status.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'}
                                    title={`Điều kiện mã giảm giá theo tổng ${isCondition ? 'hóa đơn' : 'sản phẩm'}`} />
                                <Input
                                    className={'form-control-solid mb-3 mb-lg-0'}
                                    type={'text'}
                                    name={'condition'}
                                    placeholder={'Vui lòng nhập điều kiện mã giảm giá'}
                                    onBlur={handleBlur}
                                    values={getValues("condition") ? getValues("condition") : 0}
                                />
                                {errors.condition && <Errors title={errors.condition.message} />}
                            </InputGroup>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Coupon Category'} />
                                <Selections options={allCouponCategory}
                                    name={"couponCategory"}
                                    value={getValues("couponCategory")}
                                    setValue={setValue}
                                />
                                {errors.category && <Errors title={errors.category.message} />}
                            </InputGroup>
                            {
                                !isCondition && (
                                    <InputGroup className={'mb-7'} >
                                        <Label className={'fs-6 mb-2'} title={'Product'} />
                                        <Selection options={allProduct}
                                            name={"product"}
                                            control={control}
                                            value={getValues("product")}
                                        />
                                        {errors.product && <Errors title={errors.product.message} />}
                                    </InputGroup>
                                )
                            }
                        </div>
                    </div>
                    <div className='modal-footer flex-center'>
                        <button type="reset" className='btn btn-light me-3'
                        >
                            Discard
                        </button>
                        <button type="submit" className='btn btn-primary'>
                            <span className='indicator-label'>
                                Submit
                            </span>
                        </button>
                    </div>
                </form>
            </Modal>
        </>,
        document.querySelector('body'),
    )
}

export default forwardRef(ModalFormCoupon)