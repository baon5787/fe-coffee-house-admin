import React from 'react'

import PropTypes from 'prop-types'

const Header = ({ name, children }) => {
    return (
        <div className='card-header'>
            <div className='card-title'>
                <h2>{name}</h2>
            </div>
            {children}
        </div>
    )
}

Header.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.element,
}

export default Header;
