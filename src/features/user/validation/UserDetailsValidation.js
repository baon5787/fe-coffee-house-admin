import { useState } from 'react';
import * as Yup from 'yup';
import { DEFAULT_INDEX, MATCH, MAX_MONTH, MAX_SIZE, MIN_LENGTH, MIN_YEAR } from '~/constants/AppConstant';
import { getDate, getDay, getOptionSelect } from '~/utils/HandleValue';
import { updateUserMatchPhone } from '../services/ApiCheckMatch';

export const setErrorUpdateFormUser = (data, setError) => {

    data?.firstName && setError('firstName', {
        type: "user",
        message: data?.firstName
    })

    data?.lastName && setError('lastName', {
        type: "user",
        message: data?.lastName
    })

    data?.year && setError('year', {
        type: "user",
        message: data?.year
    })

    data?.month && setError('month', {
        type: "user",
        message: data?.month
    })

    data?.day && setError('day', {
        type: "user",
        message: data?.day
    })

    data?.gender && setError('gender', {
        type: "user",
        message: data?.gender
    })

    data?.phone && setError('phone', {
        type: "user",
        message: data?.phone
    })

    data?.phovine && setError('phovine', {
        type: "user",
        message: data?.phovine
    })

    data?.district && setError('district', {
        type: "user",
        message: data?.district
    })

    data?.ward && setError('ward', {
        type: "user",
        message: data?.ward
    })

    data?.address && setError('address', {
        type: "user",
        message: data?.address
    })
}

export const InitialUserDetails = (userDetails) => {
    return {
        image: userDetails?.avater,
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        year: userDetails?.year,
        month: userDetails?.month,
        day: userDetails?.day,
        phone: userDetails?.phone,
        gender: userDetails?.gender,
        phovine: userDetails?.phovine,
        district: userDetails?.district,
        ward: userDetails?.ward,
        address: userDetails?.address,
    }
}

export const UserDetailsValidation = (params, allProvince, allDistrict, allWard, allGender,
    accessToken, axiosJwt, dispatch) => {

    const [phone, setPhone] = useState();
    const [phoneMessage, setPhoneMessage] = useState("");

    return Yup.object().shape({
        image: Yup.mixed()
            .test({
                name: 'is-image',
                skipAbsent: true,
                test(value, ctx) {
                    if (params !== null && params !== undefined) {
                        return true;
                    }

                    if (value?.length <= MIN_LENGTH) {
                        return ctx.createError({ message: 'Vui lòng chọn hình ảnh sản phẩm' });
                    }
                    if (value?.length && value[DEFAULT_INDEX]?.size > MAX_SIZE) {
                        return ctx.createError({ message: `Kích thước tệp quá lớn (Max <= ${MAX_SIZE})` });
                    }
                    if (value?.length && !["image/jpeg", "image/png", "image/jpg"]?.includes(value[DEFAULT_INDEX]?.type)) {
                        return ctx.createError({ message: 'Định dạng tệp không được hỗ trợ' });
                    }
                    return true;
                }
            }),
        firstName: Yup.string()
            .required('Vui lòng nhập vào họ của nhân viên')
            .test({
                name: 'is-firstName',
                skipAbsent: true,
                test(value, ctx) {
                    if (value.match(/[0-9!@#$%^&*()_+\-=\\[\]{};':\\"\\|,.<>\\/?]/)) {
                        return ctx.createError({ message: 'Họ của nhân viên không có số và kí tự đặt biệt' });
                    }
                    return true;
                }
            }),
        lastName: Yup.string()
            .required('Vui lòng nhập vào tên của nhân viên')
            .test({
                name: 'is-firstName',
                skipAbsent: true,
                test(value, ctx) {
                    if (value.match(/[0-9!@#$%^&*()_+\-=\\[\]{};':\\"\\|,.<>\\/?]/)) {
                        return ctx.createError({ message: 'Tên của nhân viên không có số và kí tự đặt biệt' });
                    }
                    return true;
                }
            }),
        phone: Yup.string()
            .test({
                name: 'is-phone',
                skipAbsent: true,
                async test(value, ctx) {

                    if (phone !== value) {

                        setPhone(value);

                        if (!value.trim()) {
                            const message = 'Vui lòng nhập vào số điện thoại';
                            setPhoneMessage(message)
                            return ctx.createError({ message: message });
                        }

                        if (!value.match(/^[0]{1}[0-9]{9}$/)) {
                            const message = 'Số điện thoại chỉ có 10 số và bắt đầu bằng số 0';
                            setPhoneMessage(message)
                            return ctx.createError({ message: message });
                        }

                        const match = await updateUserMatchPhone(params, value, accessToken, dispatch,
                            axiosJwt);
                        if (match === MATCH) {
                            const message = 'Số điện thoại đã có người sử dụng';
                            setPhoneMessage(message)
                            return ctx.createError({ message: message });
                        }

                        setPhoneMessage('');
                        return true;
                    } else {
                        if (phoneMessage !== '') {
                            return ctx.createError({ message: phoneMessage });
                        }

                        return true;
                    }
                }
            }),
        year: Yup.number()
            .required('Vui lòng chọn năm')
            .min(MIN_YEAR, `Vui lòng chọn năm lớn năm ${MIN_YEAR}`)
            .max(getDate?.getFullYear(), `Vui lòng chọn năm nhỏ hoặc bằng năm ${getDate?.getFullYear()}`),
        month: Yup.number()
            .required('Vui lòng chọn tháng')
            .when('year', {
                is: getDate?.getFullYear(),
                then: () => Yup.number()
                    .min(1, 'Vui lòng chọn tháng lớn hoặc bằng tháng 1')
                    .max(getDate?.getMonth() + 1, `Vui lòng chọn tháng nhỏ hoặc bằng tháng ${getDate?.getMonth() + 1}`),
                otherwise: () => Yup.number()
                    .min(1, 'Vui lòng chọn tháng lớn hoặc bằng tháng 1')
                    .max(MAX_MONTH, `Vui lòng chọn tháng nhỏ hoặc bằng tháng ${MAX_MONTH}`),
            }),
        day: Yup.number()
            .required('Vui lòng chọn ngày')
            .when(['year', 'month'], ([year, month], schema) => {
                if (year === getDate.getFullYear() && month === getDate.getMonth() + 1) {
                    return Yup.number()
                        .min(1, 'Vui lòng chọn ngày lớn hoặc bằng ngày 1')
                        .max(getDate?.getDate(), `Vui lòng chọn ngày nhỏ hoặc bằng ngày ${getDate?.getDate()}`);
                }
                const day = getDay(month, year);
                return Yup.number()
                    .min(1, 'Vui lòng chọn ngày lớn hoặc bằng ngày 1')
                    .max(day, `Vui lòng chọn ngày nhỏ hoặc bằng ngày ${day}`)
            }),
        gender: Yup.string()
            .required('Vui chọn giới tính')
            .test({
                name: 'is-gender',
                skipAbsent: true,
                test(value, ctx) {
                    const status = getOptionSelect(allGender, value);
                    return status?.length > MIN_LENGTH ? true
                        : ctx.createError({ message: 'Vui chọn giới tính vì không có giới tính nay' });
                }
            }),
        phovine: Yup.string()
            .test({
                name: 'is-phovine',
                skipAbsent: true,
                test(value, ctx) {
                    const status = getOptionSelect(allProvince, value);
                    return status?.length > MIN_LENGTH ? true
                        : ctx.createError({ message: 'Vui lòng chọn Tỉnh/Thành phố' });
                }
            }),
        district: Yup.string()
            .test({
                name: 'is-district',
                skipAbsent: true,
                test(value, ctx) {
                    const status = getOptionSelect(allDistrict, value);
                    return status?.length > MIN_LENGTH ? true
                        : ctx.createError({ message: 'Vui lòng chọn Quận/Huyện' });
                }
            }),
        ward: Yup.string()
            .test({
                name: 'is-ward',
                skipAbsent: true,
                test(value, ctx) {
                    const status = getOptionSelect(allWard, value);
                    return status?.length > MIN_LENGTH ? true
                        : ctx.createError({ message: 'Vui lòng chọn Phường/Xã' });
                }
            }),
        address: Yup.string()
            .required('Vui lòng nhập vào địa chỉ')
            .matches(/^[a-zA-Z0-9]{2}[a-zA-Z0-9\s\\/]+$/,
                'Địa chỉ có 2 kí tự đầu là số hoặc chữ và các kí tự khác không có kí tự đặt biệt trừ(/)')
            .max(100, 'Địa chỉ phải nhỏ hoặc bằng 100 kí tự'),
    });
}
