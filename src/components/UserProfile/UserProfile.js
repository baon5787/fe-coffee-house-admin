import React from 'react'
import { Link } from 'react-router-dom';

const UserProfile = ({ attrs }) => {
    return (
        <>
            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px show'
                {...attrs} tabIndex="-1"
            >
                <div className='menu-item px-3'>
                    <div className='menu-content d-flex align-items-center px-3'>
                        <div className='symbol symbol-50px me-5'>
                            <img src='/media/avatars/150-20.jpg' alt="Logo" />
                        </div>
                        <div className='d-flex flex-column'>
                            <div className='fw-bold d-flex align-items-center fs-5'>
                                Nguyen Dinh Bao
                            </div>
                        </div>
                    </div>
                </div>
                <div className='separator my-2'></div>
                <div className='menu-item px-5'>
                    <Link to='/profile' className='menu-link px-5'>My Profile</Link>
                </div>
                <div className='menu-item px-5'>
                    <Link to='/logout' className='menu-link px-5'>Sign Out</Link>
                </div>
            </div>
        </>
    )
}

export default UserProfile;
