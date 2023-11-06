import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Errors, Input, InputGroup, InputPassword, Label } from '~/components/form'
import useBase from '~/hooks/useBase'
import LoginValidation from '../validation/LoginValidation'
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../services/ApiAuth'
import { isValueUndefined } from '~/utils/CheckValue'

const FormLogin = () => {

    const { dispatch, navigate } = useBase();

    const [titleError, setTitleError] = useState();

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        reValidateMode: 'onBlur',
        resolver: yupResolver(LoginValidation())
    });

    const onSubmit = (data) => {
        loginUser(data, dispatch, navigate, setError, setTitleError);
    }


    return (
        <form className='w-full'
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                !isValueUndefined(titleError) && !(!titleError.trim()) && (
                    <p className='invalid-feedback flex justify-center text-4 mb-5'>
                        {titleError}
                    </p>
                )
            }
            <InputGroup className={'!mb-10'}>
                <Label
                    title={'Tên sản phẩm'}
                    className={'text-6 font-semibold text-text-theme-dark'}
                />
                <Input
                    className={'form-control-lg form-control-solid mb-2'}
                    type={'email'}
                    placeholder={'Vui lòng nhập tên sản phẩm'}
                    register={register('email')}
                    autoComplete='off'
                />
                {errors.email && <Errors title={errors.email.message} />}
            </InputGroup>
            <InputGroup className={'!mb-10'}>
                <div className='flex items-center justify-between mb-2'>
                    <Label title={'Tên sản phẩm'}
                        className={'text-text-theme-dark font-semibold text-6'}
                    />
                    <Link className='font-semibold text-6 text-theme-primary decoration-theme-primary hover:text-link-hover-color hover:decoration-link-hover-color-rgb'>
                        Forgot Password ?
                    </Link>
                </div>
                <InputPassword
                    className={'form-control form-control-solid form-control-lg mb-2'}
                    placeholder={'Vui lòng nhập password'}
                    register={register('password')}
                    autoComplete='off'
                />
                {errors.password && <Errors title={errors.password.message} />}
            </InputGroup>
            <div className='text-center'>
                <button className='btn btn-primary w-[calc(100%-calc(3rem+2px))]'
                >
                    Continue
                </button>
            </div>
        </form>
    )
}

export default FormLogin