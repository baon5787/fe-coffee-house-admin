import React from 'react'
import PropTypes from 'prop-types'

export const CardHeader = ({ children, name }) => {
    return (
        <>
            <div className='card-header'>
                <div className='card-title'>
                    <h2>{name}</h2>
                </div>
                {children}
            </div>
        </>
    )
}

CardHeader.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.element,
}

export default CardHeader;
