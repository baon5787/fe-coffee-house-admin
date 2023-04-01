import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className='footer py-4 d-flex flex-lg-column'>
                {/* begin::Container */}
                <div className='container-fluid d-flex flex-column flex-md-row flex-stack'>
                    {/* begin::Copyright */}
                    <div className='text-dark order-2 order-md-1'>
                        <span className='text-gray-400 fw-bold me-1'>Created by</span>
                        <Link className='text-muted text-hover-primary fw-bold me-2 fs-6'>Keenthemes</Link>
                    </div>
                    {/* end::Copyright */}
                    {/* begin::Menu */}
                    <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
                        <li className='menu-item'>About</li>
                        <li className='menu-item'>Support</li>
                        <li className='menu-item'>Free Download</li>
                    </ul>
                    {/* end::Menu */}
                </div>
                {/* end::Container */}
            </div>
        </>
    )
}

export default Footer;
