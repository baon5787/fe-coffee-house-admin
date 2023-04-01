import React from 'react'
const Menu = ({ children }) => {
    return (
        <>
            <div className='aside-menu flex-column-fluid px-3 px-lg-6'>
                <div
                    className='menu menu-column menu-pill menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-500 fw-bold fs-5 my-5 mt-lg-2 mb-lg-0'
                >
                    <div className='hover-scroll-y me-n3 pe-3'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;