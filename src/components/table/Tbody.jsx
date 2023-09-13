import React from 'react'
import PropTypes from 'prop-types';

const Tbody = ({ className, data, children }) => {
    return (
        <tbody className={`fw-semibold text-gray-600 ${className ? className : ''}`}>
            {data?.map((item, index) => children(item, index))}
        </tbody>
    )
}

Tbody.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
}

export default Tbody;
