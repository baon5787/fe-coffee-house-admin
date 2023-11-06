import React from 'react'
import PropTypes from 'prop-types';

const Table = ({ className, children }) => {
    return (
        <div className='overflow-x-auto'>
            <table className={`${className ? className : null}`}>
                {children}
            </table>
        </div>
    )
}

Table.propTypes = {
    className: PropTypes.string,
}

export default Table