import React from 'react'
import { Link } from 'react-router-dom';

const Menu = ({ deleteMess, editProduct }) => {
    return (
        <>
            <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4 show'>
                <div className='menu-item px-3'>
                    <Link className='menu-link px-3' onClick={deleteMess}>Edit</Link>
                </div>
                <div className='menu-item px-3'>
                    <Link className='menu-link px-3' onClick={editProduct}>Delete</Link>
                </div>
            </div>
        </>
    )
}
export default Menu;
