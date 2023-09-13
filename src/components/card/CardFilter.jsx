import React from 'react'
import PropTypes from 'prop-types';

const CardFilter = ({ children, isError }) => {

    if (isError) return;

    return (
        <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
            {children}
        </div>
    )
}

CardFilter.propTypes = {
    isError: PropTypes.bool.isRequired,
}

export default CardFilter;
