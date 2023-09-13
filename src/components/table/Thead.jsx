import React from 'react'
import PropTypes from 'prop-types';

const Thead = ({ children }) => {
    return (
        <thead>
            <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                {children}
            </tr>
        </thead>
    )
}

Thead.propTypes = {
    children: PropTypes.array.isRequired,
}

export default Thead;
