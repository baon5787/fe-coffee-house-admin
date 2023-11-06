import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import auths from '~/assets/image/auths';

const AuthLayout = () => {
    useEffect(() => {
        document.body.classList.add('auth-bg');
        document.getElementById('root').removeAttribute("class")
        document.getElementById('root').classList.add('auth-page')
    }, [])

    return (
        <>
            <div className='grid-area-aside relative hidden lg:flex justify-center items-center m-[2rem_0_2rem_2rem] bg-auth-bg rounded-[1.125rem]'>
                <img src={auths.img} alt="" className='max-h-[65%] h-auto' />
                <img src={auths.shapeLight} alt="" className='absolute w-full bottom-0 left-0 h-[35%]' />
            </div>
            <div className='grid-area-body xl:grid flex items-center p-4 sm:p-12'>
                <div className='w-[400px] mx-auto'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AuthLayout