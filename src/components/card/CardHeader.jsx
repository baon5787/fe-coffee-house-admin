import React from 'react'
import PropTypes from 'prop-types';

const CardHeader = ({ name, children, className }) => {
    return (
        <div className={`card-header ${className ? className : null}`}>
            {
                name && <div className='card-title'><h2>{name}</h2></div>
            }
            {children}
        </div>
    )
}

CardHeader.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
}

export default CardHeader