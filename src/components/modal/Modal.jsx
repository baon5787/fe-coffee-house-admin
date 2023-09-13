import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children }) => {
    return (
        <>
            <div className='modal fade show d-block'>
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    <div className='modal-content'>
                        {children}
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </>
    )
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
}

export default Modal;
