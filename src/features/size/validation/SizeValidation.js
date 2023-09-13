import { useState } from 'react';
import * as Yup from 'yup';
import { MATCH } from '~/constants/AppConstant';
import { sizeMatchCode, sizeMatchName } from '../services/ApiCheckMatch';

export const InitialSizeAdd = () => {
    return {
        name: "",
        code: "",
        price: 0,
    }
}

export const InitialSizeUpdate = (size) => {
    return {
        name: size?.name,
        code: size?.code,
        price: size?.price,
    }
}

export const setErrorFormSize = (data, setError) => {
    data?.name && setError('name', {
        type: "size",
        message: data?.name
    })

    data?.code && setError('code', {
        type: "size",
        message: data?.code
    })

    data?.price && setError('price', {
        type: "size",
        message: data?.price
    })
}

const SizeValidation = (accessToken, axiosJwt, dispatch, params) => {

    const [code, setCode] = useState();
    const [codeMessage, setCodeMessage] = useState("");
    const [name, setName] = useState();
    const [nameMessage, setNameMessage] = useState("");

    return Yup.object().shape({
        name: Yup.string()
            .test({
                name: 'is-name',
                skipAbsent: true,
                async test(value, ctx) {

                    if (name !== value) {

                        setName(value);

                        if (value === "") {
                            const message = 'Vui lòng nhập vào tên kích thước sản phẩm';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (value.match(/[`!@#$^&*%"_+=[\]{};'.,:\\|<>/?~]/)) {
                            const message = 'Tên kích thước sản phẩm không có kí tự đặt biệt và số';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        const match = await sizeMatchName(value, params, accessToken, dispatch,
                            axiosJwt);
                        if (match === MATCH) {
                            const message = 'Tên kích thước sản phẩm đã sử dụng rồi';
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
        code: Yup.string()
            .test({
                name: 'is-code',
                skipAbsent: true,
                async test(value, ctx) {

                    if (code !== value) {

                        setCode(value);

                        if (value === "") {
                            const message = 'Vui lòng nhập vào kí hiệu kích thước sản phẩm';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (!value.match(/^[A-Z]*$/)) {
                            const message = 'Kí hiệu kích thước sản phẩm không có kí tự đặt biệt và số, kí tự thường';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }
                        const match = await sizeMatchCode(value, params, accessToken, dispatch,
                            axiosJwt);
                        if (match === MATCH) {
                            const message = 'Kí hiệu kích thước sản phẩm đã sử dụng rồi';
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
        price: Yup.number()
            .required('Vui lòng nhập vào giá kích thước sản phẩm')
            .min(0, 'Bạn phải nhập giá kích thước sản phẩm trên 0 đồng')
            .max(200000, 'Bạn phải nhập Giá kích thước sản phẩm dưới 2 trăm nghìn đồng')
            .typeError('Giá sản phẩm phải là một con số'),
    });
}

export default SizeValidation
