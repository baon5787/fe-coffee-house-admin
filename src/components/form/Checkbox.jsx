import React from 'react'
import PropTypes from 'prop-types';

const Checkbox = ({ register, value, onChange, isChecked, title }) => {
    return (
        <label className={`${isChecked ? 'form-checked' : ''} btn btn-active-light-primary border-btn-outline-dashed !flex !p-6 !text-start shadow-none`}>
            <span className='form-check form-check-solid'>
                <input type="checkbox"
                    className='form-check-input'
                    value={value}
                    {...register}
                    onChange={onChange}
                    checked={isChecked}
                />
            </span>
            <div className='ml-5'>
                <span className='!text-4 !font-semibold !text-gray-800 !block'>
                    {title}
                </span>
            </div>
        </label>
    )
}

Checkbox.propTypes = {
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
}

export default Checkbox
