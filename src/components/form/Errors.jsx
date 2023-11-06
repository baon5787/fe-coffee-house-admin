import React from 'react'
import PropTypes from 'prop-types';

const Errors = ({ title, className }) => {
    return (
        <span className={`invalid-feedback ${className ? className : ''}`}>
            {title}
        </span>
    )
}

Errors.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
}

export default Errors