import React from 'react'
import { FormLogin } from '~/features/auth'

const Login = () => {
    return (
        <>
            <div className='text-center mb-10'>
                <h1 className='text-text-theme-dark mb-3'>Sign In to Rider HTML Pro</h1>
            </div>
            <FormLogin />
        </>
    )
}

export default Login