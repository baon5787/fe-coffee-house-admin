import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ModalHeader = ({ title, onClose }) => {
    return (
        <div className='modal-header'>
            <h2 className='font-semibold'>{title}</h2>
            <div className='group btn btn-icon shadow-none w-[calc(1.5em+1.1rem+2px)] h-[calc(1.5em+1.1rem+2px)]'
                onClick={() => onClose()}
            >
                <FontAwesomeIcon icon={faXmark}
                    className='w-7 h-7 text-text-theme-muted group-hover:text-text-theme-primary'
                />
            </div>
        </div>
    )
}

ModalHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ModalHeader