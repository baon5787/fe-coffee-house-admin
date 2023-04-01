import React from 'react'
import { Link } from 'react-router-dom';

const Title = () => {
    return (
        <>
            <div className='page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-2 mb-5 mb-lg-0'>
                {/* begin::Heading */}
                <h1 className='text-dark fw-bolder mt-1 mb-1 fs-2'>
                    Tables
                    <small className='text-muted fs-6 fw-normal ms-1'>extendedbootstrap tables</small>
                </h1>
                {/* end::Heading */}
                {/* begin::Breadcrumb */}
                <ul className='breadcrumb fw-bold fs-base mb-1'>
                    <li className='breadcrumb-item text-muted'>
                        <Link className='text-muted text-hover-primary'>Home</Link>
                    </li>
                    <li className='breadcrumb-item text-dark'>User</li>
                </ul>
                {/* end::Breadcrumb */}
            </div>
        </>
    )
}

export default Title;
