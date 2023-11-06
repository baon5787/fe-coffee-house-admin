import React from 'react'

const Textarea = ({ className, register, ...inputProps }) => {
    return (
        <textarea
            className={`form-control ${className}`}
            {...inputProps}
            {...register}
        />
    )
}

export default Textarea