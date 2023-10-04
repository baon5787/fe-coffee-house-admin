import React from 'react'
import logos from '~/images/logos';
import illustrations from '~/images/illustrations';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid'>
            <div className='d-flex flex-column flex-lg-row-auto w-xl-600px bg-primary positon-xl-relative'>
                <div className='d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y'>
                    <div className='d-flex flex-row-fluid flex-column flex-center text-center p-10 pt-lg-20'>
                        <div className='py-9 mb-10'>
                            <img
                                alt="Logo" src={logos.logo}
                                className='h-70px'
                            />
                        </div>
                        <h1 className='fw-bold fs-2qx pb-5 pb-md-10 text-white'>Welcome to Rider</h1>
                        <p className='text-white fw-semibold fs-2'>
                            Discover Simply Amazing Admin Dashboard <br />
                            With The Stunning Design System
                        </p>
                        <div className='d-flex flex-row-auto flex-center"'>
                            <img
                                src={illustrations.dozzy} alt=""
                                className='h-200px h-lg-350px mb-10'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid py-10'>
                <div className='d-flex flex-center flex-column flex-column-fluid'>
                    <div className='w-lg-500px p-10 p-lg-15 mx-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;
