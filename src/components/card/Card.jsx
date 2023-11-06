import React from 'react'
import PropTypes from 'prop-types';

const Card = ({ className, children }) => {
    return (
        <div className={`card ${className ? className : ''}`}>
            {children}
        </div>
    )
}

Card.propTypes = {
    className: PropTypes.string,
}

export default Card