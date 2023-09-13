import React, { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom';
import { PATH } from '~/constants/Paths';

const MenuItem = ({ icon, data = {} }) => {

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
    }, [menu]);

    const location = useLocation().pathname;

    const isHere = location.startsWith(`/${data?.to}`) ? 'here ' : '';

    if (!data || !data.to || !data.title) return;

    if (!data.children || !data.children.length) {
        return (
            <div className={`menu-item menu-accordion mb-1 ${isHere}`} ref={menuRef}>
                <span className='menu-link'>
                    <span className='menu-icon'>
                        <span className='svg-icon svg-icon-2'>
                            {icon}
                        </span>
                    </span>
                    <span className='menu-title'>{data?.title}</span>
                    <span className='menu-arrow'></span>
                </span>
            </div>
        )
    }

    return (
        <>
            <div className={`menu-item menu-accordion mb-1 ${isHere}${menu ? 'hover show' : ''}`}
                onClick={() => setMenu(!menu)} ref={menuRef}
            >
                <span className='menu-link'>
                    <span className='menu-icon'>
                        <span className='svg-icon svg-icon-2'>
                            {icon}
                        </span>
                    </span>
                    <span className='menu-title'>{data?.title}</span>
                    <span className='menu-arrow'></span>
                </span>
                <div className={`menu-sub menu-sub-accordion ${menu && 'show'} `}>
                    {
                        data?.children?.map((item, index) => {

                            if (!item.to || !item.title) return <></>;

                            return (
                                <div key={index} className='menu-item'>
                                    <Link className='menu-link'
                                        to={
                                            item?.to === PATH.INDEX
                                                ? item?.to + data?.to
                                                : data?.to + '/' + item?.to
                                        }
                                    >
                                        <span className='menu-bullet'>
                                            <span className='bullet bullet-dot'></span>
                                        </span>
                                        <span className='menu-title'>{item?.title}</span>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div >
            </div>
        </>
    )
}

MenuItem.propTypes = {
    icon: PropTypes.element.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
        })).isRequired,
    }),
}

export default MenuItem;
