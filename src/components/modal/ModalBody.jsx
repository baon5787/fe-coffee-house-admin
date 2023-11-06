import React from 'react'
import PropTypes from 'prop-types'

const ModalBody = ({ children, className }) => {
    return (
        <div className='modal-body !py-10 lg:!px-17'>
            <div className={`scroll-y !-mr-7 !pr-7 max-h-[250px] ${className ? className : ''}`}>
                {children}
            </div>
        </div>
    )
}


ModalBody.propTypes = {
    className: PropTypes.string,
}

export default ModalBody