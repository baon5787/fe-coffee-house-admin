import React from 'react'

const CheckBox = ({ register, value, onChange, isChecked, title }) => {

    return (
        <div className='col'>
            <label className='btn btn-outline btn-outline-dashed btn-active-light-primary  d-flex text-start p-6'>
                <span className='form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1'>
                    <input
                        className='form-check-input'
                        type="checkbox"
                        value={value}
                        {...register}
                        onChange={onChange}
                        checked={isChecked}
                    />
                </span>
                <span className='ms-5 text-truncate'>
                    <span className='fs-4 fw-bold text-gray-800'>{title}</span>
                </span>
            </label>
        </div>
    )
}

export default CheckBox;
