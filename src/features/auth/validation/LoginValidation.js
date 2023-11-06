import * as Yup from 'yup';

export const setErrorForm = (data, setError) => {
    data?.email && setError('email', {
        type: "login",
        message: data?.email
    })

    data?.password && setError('password', {
        type: "login",
        message: data?.password
    })
}

const LoginValidation = () => {
    return Yup.object().shape({
        email: Yup.string()
            .required('Vui lòng nhập vào email')
            .matches(
                /^[\w\\.]+@([\w-]+\.)+[\w-]{2,3}$/,
                'Vui lòng nhập lại vì sai email theo yêu cầu (vd: bao@gmail.com)'
            ),
        password: Yup.string()
            .required('Vui lòng nhập vào mật khẩu')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^(?=.*[^A-Za-z0-9])/,
                'Mật khẩu phải có ít nhất 1 kí tự đặt biệt, số, chữ thường và chữ hoa'),
    })
}

export default LoginValidation