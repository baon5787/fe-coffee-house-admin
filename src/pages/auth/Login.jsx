import React from "react";

import img from '~/images/logos/logo-default-light.svg'

const Login = () => {
    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid'>
            <div className='d-flex flex-column flex-lg-row-auto w-xl-650px bg-primary positon-xl-relative'>
                <div className='d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-650px scroll-y'>
                    <div className='d-flex flex-row-fluid flex-column flex-center text-center p-10 pt-lg-20'>
                        <div className='py-9 mb-10'>
                            <img src={img} alt="" className='h-70px' />
                        </div>
                        <h1 className='fw-bold fs-2qx pb-5 pb-md-10 text-white'>Welcome to Rider</h1>
                        <p className='text-white fw-semibold fs-2'>
                            Discover Simply Amazing Admin Dashboard <br />
                            With The Stunning Design System
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid py-10'>
                <div className='d-flex flex-center flex-column flex-column-fluid'>
                    <div className='w-lg-500px p-10 p-lg-15 mx-auto'>
                        <form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'>
                            <div className='text-center mb-10'>
                                <h1 className='text-dark mb-3'>Sign In to Rider HTML Pro</h1>
                            </div>
                            <div className='fv-row mb-10 fv-plugins-icon-container'>
                                <label className='form-label fs-6 fw-bold text-dark'>Email</label>
                                <input type="text" className='form-control form-control-lg form-control-solid'
                                    name='email'
                                    autoComplete='off'
                                />
                            </div>
                            <div className='fv-row mb-10 fv-plugins-icon-container'>
                                <div className='d-flex flex-stack mb-2'>
                                    <label className='form-label fs-6 fw-bold text-dark'>Password</label>
                                    <div className='link-primary fs-6 fw-bold'> Forgot Password ?</div>
                                </div>
                                <input type="password" className='form-control form-control-lg form-control-solid'
                                    name='password'
                                    autoComplete='off'
                                />
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-lg btn-primary w-100 mb-5'>
                                    <span className='indicator-label'>Continue</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;