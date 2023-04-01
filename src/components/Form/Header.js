import React from 'react'

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

export default Header;
