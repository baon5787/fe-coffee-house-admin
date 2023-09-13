import React from 'react'
import { CloseIcon } from '../icons';
import PropTypes from 'prop-types'

const ModalHeader = ({ onClose, title }) => {
    return (
        <div className='modal-header'>
            <h2 className='fw-bold'>{title}</h2>
            <div className='btn btn-icon btn-sm btn-active-icon-primary'
                onClick={() => onClose()}
            >
                <span className='svg-icon svg-icon-1'>
                    <CloseIcon size={24} />
                </span>
            </div>
        </div>
    )
}

ModalHeader.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}

export default ModalHeader;

