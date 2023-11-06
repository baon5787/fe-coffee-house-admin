import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ data = {}, sideBarRef }) => {
    const [isMenu, setIsMenu] = useState(false);

    const menuRef = useRef();

    const location = useLocation().pathname;

    const isHere = location.startsWith(`/${data?.to}`);

    useLayoutEffect(() => {
        if (isHere) setIsMenu(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let handleClick = (e) => {

            if (sideBarRef?.current === undefined || !sideBarRef.current.contains(e.target)) {
                return;
            }

            if (!menuRef.current.contains(e.target)) {
                setIsMenu(false);
            }
        }
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenu]);

    if (!data || !data.to || !data.title) return;

    if (!data.children || !data.children.length) {
        return (
            <li className={`menu-item mb-1 ${isHere ? 'here' : ''}`}>
                <Link to={data?.to} className='group menu-link text-text-gray-600'>
                    <span className='w-8 mr-2'>
                        {data?.icon && <FontAwesomeIcon icon={data?.icon}
                            className='w-6 h-6 text-text-gray-400 group-hover:text-theme-primary [.here_&]:text-theme-primary'
                        />}
                    </span>
                    <span className='flex-grow'>
                        {data?.title}
                    </span>
                </Link>
            </li>
        )
    }

    return (
        <li className={`menu-item mb-1 ${isMenu ? 'show' : ''} ${isHere ? 'here' : ''}`}
            ref={menuRef}
            onClick={() => setIsMenu(!isMenu)}
        >
            <span className='group menu-link text-text-gray-600'>
                <span className='w-8 mr-2'>
                    {data?.icon && <FontAwesomeIcon icon={data?.icon}
                        className='w-6 h-6 text-text-gray-400 group-hover:text-theme-primary [.show_&]:text-theme-primary [.here_&]:text-theme-primary'
                    />}
                </span>
                <span className='flex-grow'>
                    {data?.title}
                </span>
                <span className='menu-arrow after:bg-text-gray-500 group-hover:after:bg-theme-primary '></span>
            </span>
            <ul className={`menu-sub ${isMenu ? 'show' : ''}`}>
                {
                    data?.children?.map((item, index) => {
                        if (!item.to || !item.title) return <></>;
                        const url = item?.to === '/'
                            ? item?.to + data?.to
                            : data?.to + '/' + item?.to;

                        return (
                            <li className='menu-item' key={index}>
                                <Link to={url} className={`group menu-link text-text-gray-600 ${location === url ? 'active' : ''}`}>
                                    <span className='menu-bullet'>
                                        <span className='bullet-dot'></span>
                                    </span>
                                    <span className='menu-title'>{item?.title}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </li>
    )
}

export default MenuItem