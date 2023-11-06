import React from 'react'
import PropTypes from 'prop-types';

const CardFooter = ({ className, children }) => {
    return (
        <div className={`card-footer ${className ? className : null}`}>
            {children}
        </div>
    )
}

CardFooter.propTypes = {
    className: PropTypes.string,
}

export default CardFooter