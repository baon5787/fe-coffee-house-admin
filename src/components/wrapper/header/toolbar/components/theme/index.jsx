import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import ThemeSetting from './ThemeSetting';
import { THEME } from '~/constants/AppConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faDesktop } from '@fortawesome/free-solid-svg-icons'

const option = [
    {
        name: THEME.LIGHT,
        icon: faSun
    },
    {
        name: THEME.DARK,
        icon: faMoon
    },
    {
        name: THEME.SYSTEM,
        icon: faDesktop
    }
];

const Theme = () => {


    const renderResult = (attrs) => (
        <ThemeSetting option={option} attrs={attrs} tabIndex={"-1"} setThemeSettings={setThemeSettings} />
    );

    const [themeSettings, setThemeSettings] = useState(false);

    useEffect(() => {
        if (themeSettings) {
            setThemeSettings(!themeSettings);
        }
    }, [themeSettings])

    return (
        <>
            <div className='d-flex align-items-center ms-2 ms-lg-3'>
                <Tippy
                    interactive
                    trigger={'click '}
                    placement="bottom-end"
                    render={renderResult}
                    disabled={themeSettings}
                >


                    {/* begin::Menu toggle */}
                    <Link to='#' className={`btn btn-icon btn-active-light-primaryw-35px h-35px w-md-40px h-md-40px`}>
                        {/* begin::Svg Icon */}
                        {
                            option?.map((item, index) => {
                                return (item.name === THEME.LIGHT || item.name === THEME.DARK) && (
                                    <span key={index}
                                        className={
                                            `svg-icon svg-icon-2 ${item?.name === THEME.DARK
                                                ? 'theme-dark-show'
                                                : 'theme-light-show'
                                            }`
                                        }>
                                        <FontAwesomeIcon icon={item?.icon} />
                                    </span>
                                )
                            })
                        }
                        {/* end::Svg Icon */}
                    </Link>
                    {/* end::Menu toggle */}
                </Tippy>
            </div>
        </>
    )
}

export default Theme;
