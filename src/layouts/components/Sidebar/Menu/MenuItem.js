import React, { useEffect, useRef, useState } from 'react'

import MenuSub from '~/components/MenuSub'

const MenuItem = ({ title, icon, data = [], to }) => {

    const [menu, setMenu] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        let handleClick = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        }
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [menu])

    return (
        <>
            <div className={`menu-item menu-accordion mb-1 ${menu && 'hover show'}`}
                onClick={() => setMenu(!menu)} ref={menuRef}
            >
                <span className='menu-link'>
                    <span className='menu-icon'>
                        <span className='svg-icon svg-icon-2'>
                            {icon}
                        </span>
                    </span>
                    <span className='menu-title'>{title}</span>
                    <span className='menu-arrow'></span>
                </span>
                <MenuSub data={data} menu={menu} to={to}></MenuSub>
            </div>
        </>
    )
}

export default MenuItem;
