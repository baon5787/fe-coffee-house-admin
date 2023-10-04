import * as Yup from 'yup';

const LoginValidation = () => {
    return Yup.object().shape({
        // password: Yup.string()
        //     .required('Vui long nhap mat khau'),
        // email: Yup.string()
        //     .required('vui long nhap email')
        //     .matches('/^[w\\.]+@([w-]+.)+[w-]{2,4}$/', 'Vui lòng nhập lại vì sai email theo yêu cầu (vd: bao@gmail.com)')
    })
}

export default LoginValidation
