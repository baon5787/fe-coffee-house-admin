import React from 'react'
import PropTypes from 'prop-types'
import illustrations from '~/images/illustrations'
import { Link } from 'react-router-dom'

const NotFoundPage = ({ msg }) => {
    return (
        <div className='d-flex flex-column flex-center text-center'>
            <div className='card card-flush'>
                <div className='card-body py-10 py-lg-10'>
                    <h1 className='fw-bolder fs-2hx text-gray-900 mb-4'>Page Not Found</h1>
                    <div className='fw-semibold fs-6 text-gray-500 mb-7'>
                        {msg}
                    </div>
                    <div className='mb-10'>
                        <img src={illustrations[404]} alt="error 404" className='w-100' />
                    </div>
                    <div className='mb-0'>
                        <Link to={'/index'} className='btn btn-sm btn-primary'>Go</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

NotFoundPage.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default NotFoundPage;
