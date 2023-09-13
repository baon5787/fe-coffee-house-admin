import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const Input = ({ option, className, values, ...inputProps }) => {

    const [value, setValue] = useState(values);

    const handleInputChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        setValue(values);
    }, [values])

    return (
        <>
            <input className={className}
                value={value}
                onChange={handleInputChange}
                {...inputProps}
            />
        </>
    )
}

Input.propTypes = {
    className: PropTypes.string.isRequired,
    option: PropTypes.string,
}

export default Input;
