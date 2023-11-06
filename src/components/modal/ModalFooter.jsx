import React from 'react'
import PropTypes from 'prop-types'
import { isParam } from '~/utils/CheckValue'

const ModalFooter = ({ onClose, param }) => {
    return (
        <div className='modal-footer justify-center'>
            <button type="reset" className='btn btn-light'
                onClick={() => onClose()}
            >
                Hủy bỏ
            </button>
            <button type="submit" className='btn btn-primary'>
                {isParam(param) ? 'Cập nhật' : 'Tạo'}
            </button>
        </div>
    )
}

ModalFooter.propTypes = {
    param: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}

export default ModalFooter