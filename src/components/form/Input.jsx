import React from 'react'
import PropTypes from 'prop-types';

const Input = ({ className, register, ...inputProps }) => {
    return (
        <input className={`form-control ${className}`}
            {...inputProps}
            {...register}
        />
    )
}

Input.propTypes = {
    className: PropTypes.string.isRequired,
}

export default Input