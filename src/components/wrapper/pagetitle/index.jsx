import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageTitle = ({ titlePage }) => {
    return (
        <>
            <div className='page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-2 mb-5 mb-lg-0'>
                {/* begin::Heading */}
                <h1 className='text-dark fw-bold mt-1 mb-1 fs-2'>
                    {
                        titlePage?.subTitle ? titlePage?.subTitle : titlePage?.title
                    }
                </h1>
                {/* end::Heading */}
                {/* begin::Breadcrumb */}
                <ul className='breadcrumb fw-semibold fs-base mb-1'>
                    <li className='breadcrumb-item text-muted'>
                        <Link to={'/'} className='text-muted text-hover-primary'>Home</Link>
                    </li>
                    {
                        titlePage?.subTitle ? (
                            <>
                                <li className='breadcrumb-item text-muted'>
                                    <Link to={`/${titlePage?.to}`} className='text-muted text-hover-primary'>
                                        {titlePage?.title}
                                    </Link>
                                </li>
                                <li className='breadcrumb-item text-dark'>{titlePage?.subTitle}</li>
                            </>
                        ) : (
                            <>
                                <li className='breadcrumb-item text-dark'>{titlePage?.title}</li>
                            </>
                        )
                    }
                </ul>
                {/* end::Breadcrumb */}
            </div>
        </>
    )
}

PageTitle.propTypes = {
    titlePage: PropTypes.object.isRequired,
}

export default PageTitle;
