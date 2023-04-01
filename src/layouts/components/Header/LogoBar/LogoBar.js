import React from 'react'
import { Link } from 'react-router-dom'
import { TfiMenu } from 'react-icons/tfi'
import logos from '~/images/logos';

const LogoBar = () => {
    return (
        <>
            <div className='d-flex d-lg-none align-items-center flex-grow-1'>
                <div className='btn btn-icon btn-circle btn-active-light-primary ms-n2 me-1' >
                    <span className='svg-icon svg-icon-2x'>
                        <TfiMenu></TfiMenu>
                    </span>
                </div>
                <Link to={'/'} className='d-lg-none'>
                    <img alt="Logo" src={logos.logo} className='max-h-40px' />
                </Link>
            </div>
        </>
    )
}

export default LogoBar;
