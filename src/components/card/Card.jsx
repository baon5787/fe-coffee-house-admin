import React from 'react'
import PropTypes from 'prop-types';

const Card = ({ children, className }) => {
    return (
        <>
            <div className={`card card-flush ${className}`}>
                {children}
            </div>

        </>
    )
}

Card.propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
}

export default Card; 