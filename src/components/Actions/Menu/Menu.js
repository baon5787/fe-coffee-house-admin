import React from 'react'

import PropTypes from 'prop-types'

const Menu = ({ onDeleteOrDisenableClick, onEditOrEnableClick, title }) => {

    return (
        <>
            <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4 show'>
                <div className='menu-item px-3'>
                    <div className='menu-link px-3' onClick={onEditOrEnableClick}>{title}</div>
                </div>
                <div className='menu-item px-3'>
                    <div className='menu-link px-3' onClick={onDeleteOrDisenableClick}>Delete</div>
                </div>
            </div>
        </>
    )
}

Menu.propTypes = {
    title: PropTypes.string.isRequired,
    onDeleteOrDisenableClick: PropTypes.func.isRequired,
    onEditOrEnableClick: PropTypes.func.isRequired,
}

export default Menu;
