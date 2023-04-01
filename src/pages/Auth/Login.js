import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "~/api/ApiAuth";
import logos from '~/images/logos';
import illustrations from '~/images/illustrations';

const Login = () => {

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password
        };
        loginUser(newUser, dispatch, navigate);
    }

    return (
        <>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid'>
                <div className='d-flex flex-column flex-lg-row-auto w-xl-600px bg-primary positon-xl-relative'>
                    <div className='d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y'>
                        <div className='d-flex flex-row-fluid flex-column flex-center text-center p-10 pt-lg-20'>
                            <Link to='login'>
                                <img
                                    alt="Logo" src={logos.logo}
                                    className='h-70px'
                                />
                            </Link>
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
                            <form
                                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                                onSubmit={handleSubmit}
                            >
                                <div className='text-center mb-10'>
                                    <h1 className='text-dark mb-3'>Sign In to Rider HTML Pro</h1>
                                </div>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <div className='fv-row mb-10 fv-plugins-icon-container'>
                                    <label className='form-label fs-6 fw-bold text-dark'>Email</label>
                                    <input
                                        className='form-control form-control-lg form-control-solid'
                                        type="email" name="email" autoComplete="off"
                                        ref={emailRef}
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className='fv-row mb-10 fv-plugins-icon-container'>
                                    <div className='d-flex flex-stack mb-2'>
                                        <label className='form-label fw-bold text-dark fs-6 mb-0'>Password</label>
                                        <Link
                                            to='password-reset' className='link-primary fs-6 fw-bold'
                                        >Forgot Password ?</Link>
                                    </div>
                                    <input
                                        className='form-control form-control-lg form-control-solid'
                                        type="password" name="password" autoComplete="off"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className='btn btn-lg btn-primary w-100 mb-5'>
                                        <span className='indicator-label'>Continue</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;