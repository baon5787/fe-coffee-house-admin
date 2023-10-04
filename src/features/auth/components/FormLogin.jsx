import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '~/api/ApiAuth';
import Errors from '~/components/form/Errors';
import Input from '~/components/form/Input';
import InputGroup from '~/components/form/InputGroup';
import InputPassword from '~/components/form/InputPassword';
import Label from '~/components/form/Label';
import { useBlur } from '~/hooks';
import { getValueString } from '~/utils/HandleValue';
import LoginValidation from '../validation/LoginValidation';

const FormLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(LoginValidation())
    });

    const { handleBlur } = useBlur(setValue);

    const onSubmit = async (data) => {
        console.log(JSON.stringify(data));
        loginUser(data, dispatch, navigate);
    };

    return (
        <form
            className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='text-center mb-10'>
                <h1 className='text-dark mb-3'>Sign In to Rider HTML Pro</h1>
            </div>
            <InputGroup className={"mb-10"}>
                <Label title={'Tên sản phẩm'} />
                <Input
                    className={'form-control mb-2'}
                    type={'text'}
                    name={'email'}
                    placeholder={'Vui lòng nhập tên sản phẩm'}
                    onBlur={handleBlur}
                    values={getValueString(getValues('email'))}
                />
                {errors.name && <Errors title={errors.name.message} />}
            </InputGroup>

            <InputGroup className={'mb-7'} >
                <div className='d-flex flex-stack mb-2'>
                    <label className='form-label fw-bold text-dark fs-6 mb-0'>Password</label>
                    <Link
                        to='password-reset' className='link-primary fs-6 fw-bold'
                    >Forgot Password ?</Link>
                </div>
                <InputPassword
                    className={'form-control mb-2'}
                    name={'password'}
                    placeholder={'Vui lòng nhập tên sản phẩm'}
                    onBlur={handleBlur}
                    values={getValueString(getValues('password'))}
                />
                {errors.password && <Errors title={errors.password.message} />}
            </InputGroup>
            <div className='text-center'>
                <button type="submit" className='btn btn-lg btn-primary w-100 mb-5'>
                    <span className='indicator-label'>Continue</span>
                </button>
            </div>
        </form>
    )
}

export default FormLogin;
