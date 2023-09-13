import { useState } from 'react';
import * as Yup from 'yup';
import { productMatchName, productMatchSku } from '../services/ApiCheckMatch';
import { MATCH, MAX_SIZE, MIN_LENGTH } from '~/constants/AppConstant';

export const setErrorForm = (data, setError) => {

    data?.image && setError('image', {
        type: "customer",
        message: data?.image
    })

    data?.name && setError('name', {
        type: "customer",
        message: data?.name
    })

    data?.sku && setError('sku', {
        type: "customer",
        message: data?.sku
    })

    data?.price && setError('price', {
        type: "customer",
        message: data?.price
    })

    data?.description && setError('description', {
        type: "customer",
        message: data?.description
    })

    data?.status && setError('status', {
        type: "customer",
        message: data?.status
    })

    data?.category && setError('status', {
        type: "customer",
        message: data?.category
    })

}

export const InitialValuesAdd = () => {
    return {
        image: "",
        name: "",
        sku: "",
        price: 0,
        description: "",
        status: "",
        category: "",
        sizes: []
    }
}

export const InitialValuesUpdate = (product) => {
    return {
        image: product?.imageUrl ? product?.imageUrl : "",
        name: product?.name,
        sku: product?.sku,
        price: product?.price,
        description: product?.description,
        status: product?.status,
        category: product?.category,
        sizes: product?.sizes
    }
}


const ProductValidation = (accessToken, axiosJwt, dispatch, params, allStatus, categories) => {

    const [sku, setSku] = useState();
    const [skuMessage, setSkuMessage] = useState("");
    const [name, setName] = useState();
    const [nameMessage, setNameMessage] = useState("");

    return Yup.object().shape({
        image: Yup.mixed()
            .test({
                name: 'is-image',
                skipAbsent: true,
                test(value, ctx) {
                    if (params !== null && params !== undefined) {
                        return true;
                    }

                    if (value.length <= 0) {
                        return ctx.createError({ message: 'Vui lòng chọn hình ảnh sản phẩm' });
                    }
                    if (value.length && value[0].size > MAX_SIZE) {
                        return ctx.createError({ message: `Kích thước tệp quá lớn (Max <= ${MAX_SIZE})` });
                    }
                    if (value.length && !["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)) {
                        return ctx.createError({ message: 'Định dạng tệp không được hỗ trợ' });
                    }
                    return true;
                }
            }),
        name: Yup.string()
            .test({
                name: 'is-name',
                skipAbsent: true,
                async test(value, ctx) {

                    if (name !== value) {

                        setName(value);

                        if (!value.trim()) {
                            const message = 'Vui lòng nhập vào tên sản phẩm';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (value.match(/[`!@#$^&*%"_+=[\]{};'.,:\\|<>/?~]/)) {
                            const message = 'Tên sản phẩm không có kí tự đặt biệt và số';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        const match = await productMatchName(value, params, accessToken, dispatch, axiosJwt);
                        if (match === MATCH) {
                            const message = 'Tên sản phẩm đã sử dụng rồi';
                            setNameMessage(message)
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
        sku: Yup.string()
            .test({
                name: 'is-sku',
                skipAbsent: true,
                async test(value, ctx) {

                    if (sku !== value) {

                        setSku(value);

                        if (!value.trim()) {
                            const message = 'Vui lòng nhập vào kí hiệu sản phẩm';
                            setSkuMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (!value.match(/^[A-Z]*$/)) {
                            const message = 'Kí hiệu sản phẩm không có kí tự đặt biệt và số, kí tự thường';
                            setSkuMessage(message)
                            return ctx.createError({ message: message });
                        }

                        const match = await productMatchSku(value, params, accessToken, dispatch, axiosJwt);
                        if (match === MATCH) {
                            const message = 'Kí hiệu sản phẩm đã sử dụng rồi';
                            setSkuMessage(message)
                            return ctx.createError({ message: message });
                        }

                        setSkuMessage('');
                        return true;
                    } else {
                        if (skuMessage !== '') {
                            return ctx.createError({ message: skuMessage });
                        }

                        return true;
                    }
                }
            }),
        price: Yup.number()
            .required('Vui lòng nhập vào giá sản phẩm')
            .min(30000, 'Bạn phải nhập giá tiền sản phẩm trên 30 nghìn đồng')
            .max(1500000, 'Bạn phải nhập giá tiền sản phẩm dưới 1 triệu 5 trăm nghìn đồng')
            .typeError('Giá sản phẩm phải là một con số'),
        description: Yup.string()
            .required('Vui lòng nhập vào nội dung sản phẩm')
            .test({
                name: 'is-description',
                skipAbsent: true,
                test(value, ctx) {
                    if (value.match(/[`!@#$^&*%"_+=[\]{};':\\|<>/?~]/)) {
                        return ctx.createError({ message: 'Tên sản phẩm không có một số kí tự đặt biệt' });
                    }
                    return true;
                }
            }),
        status: Yup.string()
            .test({
                name: 'is-status',
                skipAbsent: true,
                test(value, ctx) {
                    const status = allStatus?.filter((item) => item?.value === value);
                    return status?.length > MIN_LENGTH ? true
                        : ctx.createError({ message: 'Vui lòng nhập chọn loại sản phẩm' });
                }
            }),
        category: Yup.string()
            .required('Chọn loại sản phẩm')
            .matches(/^[0-9]*$/, 'Vui lòng chọn lại loại sản phẩm')
            .test({
                name: 'is-category',
                skipAbsent: true,
                test(value, ctx) {
                    const category = categories?.filter((item) => item?.value === value);
                    if (category?.length > MIN_LENGTH) return true;
                    return ctx.createError({ message: 'Vui lòng chọn lại loại sản phẩm' });
                }
            }),
    });
}

export default ProductValidation