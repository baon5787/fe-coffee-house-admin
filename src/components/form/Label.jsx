import React from 'react'
import PropTypes from 'prop-types';

const Label = ({ className, title }) => {
    return (
        <>
            <label className={`form-label ${className ? className : ''}`}>{title}</label>
        </>
    )
}

Label.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Label;
