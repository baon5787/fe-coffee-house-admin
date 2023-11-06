import { useState } from 'react';
import * as Yup from 'yup';
import { MATCH, MIN_LENGTH } from "~/constants/AppConstant"
import { categoryMatchCode, categoryMatchName } from '../services/ApiCategoryMatch';

export const InitialParentCategoryAdd = () => {
    return {
        name: "",
        code: "",
        status: "",
    }
}

export const InitialParentCategoryUpdate = (category) => {
    return {
        name: category?.name,
        code: category?.code,
        status: category?.status,
    }
}

export const setErrorParentCategoryForm = (data, setError) => {
    data?.name && setError('name', {
        type: "category",
        message: data?.name
    })

    data?.code && setError('code', {
        type: "category",
        message: data?.code
    })

    data?.status && setError('status', {
        type: "category",
        message: data?.status
    })
}

const ParentCategoryValidation = (accessToken, axiosJwt, dispatch, params, statusAll) => {
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

                        if (!value.trim()) {
                            const message = 'Vui lòng nhập vào tên loại sản phẩm';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (value.match(/[0-9!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]/)) {
                            const message = 'Tên loại sản phẩm không có số và kí tự đặt biệt';
                            setNameMessage(message)
                            return ctx.createError({ message: message });
                        }

                        const match = await categoryMatchName(value, params, accessToken,
                            dispatch, axiosJwt);
                        if (match === MATCH) {
                            const message = 'Tên loại sản phẩm bị trùng';
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

                        if (!value.trim()) {
                            const message = 'Vui lòng nhập vào mã loại sản phẩm';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (value.match(/[a-z0-9!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]/)
                            || !value.match(/[A-z]+$/)) {
                            const message = 'Mã loại sản phẩm là chữ in hoa';
                            setCodeMessage(message)
                            return ctx.createError({ message: message });
                        }

                        const match = await categoryMatchCode(value, params, accessToken,
                            dispatch, axiosJwt);
                        if (match === MATCH) {
                            const message = 'Mã loại sản phẩm bị trùng';
                            console.log(message);
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
        status: Yup.string()
            .test({
                name: 'is-status',
                skipAbsent: true,
                test(value, ctx) {
                    const status = statusAll?.filter((item) => item?.value === value);
                    return status?.length > MIN_LENGTH ? true
                        : ctx.createError({ message: 'Vui lòng nhập chọn loại sản phẩm' });
                }
            }),
    });
}

export default ParentCategoryValidation;