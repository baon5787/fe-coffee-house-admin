import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types';

const HEIGHT_LOGO = 117;

const Menu = ({ children }) => {

    const [height, setHeight] = useState(window.innerHeight - HEIGHT_LOGO);

    useEffect(() => {
        const handleUpdate = () => setHeight(window.innerHeight - HEIGHT_LOGO);
        window.addEventListener('resize', handleUpdate);
        return () => window.removeEventListener('resize', handleUpdate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerHeight])

    return (
        <>
            <div className='aside-menu flex-column-fluid px-3 px-lg-6'>
                <div
                    className='menu menu-column menu-pill menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-500 fw-bold fs-5 my-5 mt-lg-2 mb-lg-0'
                >
                    <div className='hover-scroll-y me-n3 pe-3' style={{ height: height }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

Menu.propTypes = {
    children: PropTypes.array.isRequired,
}

export default Menu;