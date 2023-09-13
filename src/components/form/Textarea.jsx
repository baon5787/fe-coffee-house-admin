import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const Textarea = ({ className, values, ...inputProps }) => {

    const [value, setValue] = useState(values);

    const handleInputChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        setValue(values);
    }, [values])

    return (
        <textarea
            className={`form-control ${className}`}
            value={value}
            onChange={handleInputChange}
            {...inputProps}
        />
    )
}

Textarea.propTypes = {
    className: PropTypes.string,
    values: PropTypes.string,
}

export default Textarea;
