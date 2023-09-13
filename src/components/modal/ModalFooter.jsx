import React from 'react'
import PropTypes from 'prop-types'

const ModalFooter = ({ focus, loading }) => {
    return (
        <div className='modal-footer flex-center'>
            <button type="reset" className='btn btn-light me-3'
            >
                Discard
            </button>
            <button type="submit" className='btn btn-primary'
                disabled={focus || loading}
                data-kt-indicator={loading ? 'on' : 'off'}
            >
                <span className='indicator-label'>
                    Submit
                </span>
                {
                    loading && (
                        <span className='indicator-progress'>
                            Vui lòng chờ .....
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                    )
                }
            </button>
        </div>
    )
}

ModalFooter.propTypes = {
    focus: PropTypes.bool.isRequired,
}

export default ModalFooter
