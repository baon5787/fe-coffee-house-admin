import React from 'react'
import PropTypes from 'prop-types';

const CardBody = ({ className, children }) => {
    return (
        <div className={`card-body ${className}`}>
            {children}
        </div>
    )
}

CardBody.propTypes = {
    className: PropTypes.string.isRequired,
}

export default CardBody