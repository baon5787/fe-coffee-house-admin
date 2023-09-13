import React from 'react'
import PropTypes from 'prop-types';
import './Table.css';

const Table = ({ className, children }) => {
    return (
        <div className='table-responsive'>
            <table className={`table align-middle table-row-dashed fs-6 gy-5 ${className}`}>
                {children}
            </table>
        </div>
    )
}

Table.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
}

export default Table;
