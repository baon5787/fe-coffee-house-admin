import React from 'react'
import PropTypes from 'prop-types'

const Menu = ({ onDeleteOrDisenableClick, onEditOrEnableClick, title }) => {
    return (
        <ul className='menu menu-sub menu-sub-dropdown menu-state-bg-light-primary text-7 font-medium py-4 w-[125px] text-text-gray-600'>
            <li className='menu-item px-3'
                onClick={onEditOrEnableClick}
            >
                <span className='menu-link'>
                    {title}
                </span>
            </li>
            <li className='menu-item px-3'
                onClick={onDeleteOrDisenableClick}
            >
                <span className='menu-link'> Delete</span>
            </li>
        </ul>
    )
}


Menu.propTypes = {
    title: PropTypes.string.isRequired,
    onDeleteOrDisenableClick: PropTypes.func.isRequired,
    onEditOrEnableClick: PropTypes.func.isRequired,
}

export default Menu