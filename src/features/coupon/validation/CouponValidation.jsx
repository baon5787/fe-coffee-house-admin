import { useState } from 'react';
import * as Yup from 'yup';
import { getCurrentPlusOneDay, getValueSelect } from '~/utils/HandleValue';
import { couponMatchCode, couponMatchName } from '../services/ApiCheckMatch';
import { MATCH } from '~/constants/AppConstant';


export const InitialCouponAdd = (status, product, couponCategories, couponType) => {
    return {
        name: "",
        code: "",
        price: 0,
        condition: 0,
        quantity: 0,
        expired: new Date(),
        couponType: couponType,
        status: status,
        couponCategory: couponCategories,
        product: product,
    }
}

export const InitialCouponUpdate = (coupon) => {

    return {
        name: coupon?.name,
        code: coupon?.code,
        price: coupon?.price,
        condition: coupon?.condition,
        quantity: coupon?.quantity,
        expired: new Date(coupon?.expired),
        couponType: coupon?.couponType,
        status: coupon?.status,
        couponCategory: coupon?.couponCategory,
        product: coupon?.product,
    }
}

export const setErrorFormCoupon = (data, setError) => {
    data?.name && setError('name', {
        type: "coupon",
        message: data?.name
    })

    data?.code && setError('code', {
        type: "size",
        message: data?.code
    })

    data?.price && setError('price', {
        type: "coupon",
        message: data?.price
    })

    data?.condition && setError('condition', {
        type: "coupon",
        message: data?.condition
    })

    data?.quantity && setError('quantity', {
        type: "coupon",
        message: data?.quantity
    })

    data?.expired && setError('expired', {
        type: "coupon",
        message: data?.expired
    })

    data?.couponType && setError('couponType', {
        type: "coupon",
        message: data?.couponType
    })

    data?.status && setError('status', {
        type: "coupon",
        message: data?.status
    })

    data?.category && setError('couponCategory', {
        type: "coupon",
        message: data?.couponCategory
    })
}

const CouponValidation = (accessToken, axiosJwt, dispatch, param, allCouponType, allStatus,
    allCategory) => {

    const [name, setName] = useState();
    const [nameMessage, setNameMessage] = useState("");
    const [code, setCode] = useState();
    const [codeMessage, setCodeMessage] = useState("");

    return Yup.object().shape({
        name: Yup.string()
            .test({
                name: 'is-name',
                skipAbsent: true,
                async test(value, ctx) {

                    if (name !== value) {

                        setName(value);

                        if (value === "") {
                            const message = 'Vui lòng nhập tên phiếu giảm giá';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (value.match(/[`!@#$^&*()%"_+\-=[\]{};'.,:\\|<>/?~]/)) {
                            const message = 'Tên phiếu giảm giá không có kí tự và số';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (await couponMatchName(value, param, accessToken, dispatch, axiosJwt)
                            === MATCH
                        ) {
                            const message = 'Phiếu giảm giá đã được sử dụng';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }

                        setNameMessage('');
                        return true;
                    } else {
                        if (nameMessage !== '') {
                            return ctx.createError({ message: nameMessage });
                        }

                        return true;
                    }
                }
            }),
        code: Yup.string()
            .test({
                name: 'is-code',
                skipAbsent: true,
                async test(value, ctx) {

                    if (code !== value) {

                        setCode(value);

                        if (value === "") {
                            const message = 'Vui lòng nhập vào mã giảm giá';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (!value.match(/^[A-Z]{3}[\w]+$/)) {
                            const message = 'Mã giảm giá phải có trên ba kí tự(ba kí tự đầu là chữ in hoa và còn lại số hoặc chữ in hoa';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (await couponMatchCode(value, param, accessToken, dispatch, axiosJwt)
                            === MATCH
                        ) {
                            const message = '"Mã giảm giá đã được sử dụng';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }

                        setCodeMessage('');
                        return true;
                    } else {
                        if (codeMessage !== '') {
                            return ctx.createError({ message: codeMessage });
                        }

                        return true;
                    }
                }
            }),
        couponType: Yup.mixed()
            .oneOf(getValueSelect(allCouponType), 'Vui lòng chọn lại loại muốn giảm tiền'),
        price: Yup.number()
            .required('Vui lòng nhập vào giá giảm')
            .typeError('Giá giảm phải là một con số')
            .when('couponType', {
                is: 'PERCENT',
                then: (schema) => schema.min(1, 'Phần trăm giảm giá không được dưới 1%')
                    .max(80, 'Phần trăm giảm giá không được trên 80%'),
                otherwise: (schema) => schema.min(15000, 'Giá tiền giảm giá không được dưới 15 nghìn đồng')
                    .max(300000, 'Giá tiền giảm giá không được trên 3 trăm nghìn đồng'),
            }),
        expired: Yup.date()
            .required('Vui lòng chọn hạn sử dụng phiếu giảm giá')
            .test({
                name: 'is-expired',
                skipAbsent: true,
                async test(value, ctx) {
                    const currentPlusOneDay = getCurrentPlusOneDay();

                    if (value.getTime() < currentPlusOneDay.getTime()) {
                        return ctx.createError({ message: 'Hạn sử dụng phiếu giảm giá lớn hơn thời gian hiện tại một ngày' });
                    }
                    return true;
                }
            }),
        couponCategory: Yup.mixed()
            .oneOf(getValueSelect(allCategory), 'Vui lòng chọn lại danh mục phiếu giảm giá'),
        condition: Yup.number()
            .required('Vui lòng nhập vào điều kiện mã giảm giá')
            .typeError('Điều kiện mã giảm giá là một con số')
            .when('couponCategory', {
                is: '1',
                then: (schema) => schema.min(100000, 'Điều kiện giá để giảm giá trên 1 trăm nghìn đồng')
                    .max(5000000, 'Điều kiện giá để giảm giá trên 5 triệu đồng'),
                otherwise: (schema) => schema.min(1, 'Điều kiện giá để giảm giá lớn hoặc bằng 1 sản phẩm')
                    .max(10, 'Điều kiện giá để giảm giá nhỏ hoặc bằng 10 sản phẩm'),
            }),
        status: Yup.mixed()
            .oneOf(getValueSelect(allStatus), 'Vui lòng chọn lại trạng thái phiếu giảm giá'),
        quantity: Yup.number()
            .min(1, 'Số lượng phiếu giảm giá trong 1 ngày lớn hơn 0')
            .max(100, 'Số lượng phiếu giảm giá trong 1 ngày nhở hơn 100')
    });
}

export default CouponValidation
