import React from 'react'

const CheckboxTable = ({ value, onChange, checked, className }) => {
    return (
        <span className={`form-check form-check-solid ${className ? className : ''}`}>
            <input
                type="checkbox"
                className='form-check-input'
                value={value}
                onChange={onChange}
                checked={checked}
            />
        </span>
    )
}

export default CheckboxTable