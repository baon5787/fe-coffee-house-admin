import React from 'react'
import PropTypes from 'prop-types';

const CardToolbar = ({ children, className }) => {
    return (
        <div className={`card-toolbar ${className ? className : null}`}>
            {children}
        </div>
    )
}

CardToolbar.propTypes = {
    className: PropTypes.string,
}

export default CardToolbar