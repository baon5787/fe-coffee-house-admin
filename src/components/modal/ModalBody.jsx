import React from 'react'
import PropTypes from 'prop-types'

const ModalBody = ({ children, className }) => {
    return (
        <div className='modal-body py-10 px-lg-17'>
            <div className={`scroll-y me-n7 pe-7 mh-250px ${className}`}>
                {children}
            </div>
        </div>
    )
}

ModalBody.propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default ModalBody
