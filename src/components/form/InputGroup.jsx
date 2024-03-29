import React from 'react'
import PropTypes from 'prop-types';

const InputGroup = ({ children, className }) => {
    return (
        <div className={`relative ${className ? className : ''}`}>
            {children}
        </div>
    )
}

InputGroup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.array.isRequired,
}

export default InputGroup