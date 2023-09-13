import React from 'react'
import illustrations from '~/images/illustrations'
import PropTypes from 'prop-types'
import styles from './error.module.css';

const Forbidden = ({ msg }) => {
    return (
        <div className={`${styles.forbidden} card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0`}>
            <div className='mb-10'>
                <div className='fs-2hx fw-bold text-gray-800 text-center mb-5'>
                    <span className='me-2'>Page Forbidden</span>
                </div>
                <div className='fw-semibold fs-2 text-gray-500 mb-7 text-center'>
                    {msg}
                </div>
            </div>
            <img src={illustrations[403]} alt="Error 403" className='mx-auto h-300px' />
        </div>
    )
}

Forbidden.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Forbidden;
