import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { THEME } from '~/constants/AppConstant';


const ThemeSetting = ({ option = [], attrs, setThemeSettings }) => {

    const onWindownTheme = () => {
        var themeMode;

        if (document.documentElement) {
            if (localStorage.getItem("data-bs-theme") !== null) {
                themeMode = localStorage.getItem("data-bs-theme");
            } else {
                themeMode = THEME.LIGHT;
            }

            if (themeMode === THEME.SYSTEM) {
                themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? THEME.DARK
                    : THEME.LIGHT;
            }

            document.documentElement.setAttribute("data-bs-theme", themeMode);
            return themeMode;
        }
    }

    const [theme, setTheme] = useState(onWindownTheme());

    useEffect(() => {

        switch (theme) {

            case THEME.LIGHT: {
                setThemeMode();
                break;
            }
            case THEME.DARK: {
                setThemeMode();
                break;
            }
            case THEME.SYSTEM: {
                setThemeMode();
                break;
            }

            default:
                onWindownTheme();
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme])

    const setThemeMode = () => {
        setTheme(theme);
        if (theme === THEME.SYSTEM) {
            localStorage.setItem("data-bs-theme", THEME.LIGHT);
        } else {
            localStorage.setItem("data-bs-theme", theme);
            document.documentElement.setAttribute("data-bs-theme", theme);
        }
    }

    return (
        <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px show'
            {...attrs}
        >
            {
                option?.map((item, index) => {
                    return (
                        <div key={index} className='menu-item px-3 my-0' onClick={() => {
                            setTheme(item.name);
                            setThemeSettings(true);
                        }
                        }>
                            <Link to='#' className={`menu-link px-3 py-2 ${theme === item.name && 'active'}`}>
                                <span className='menu-icon'>
                                    {/* begin::Svg Icon | path: icons/duotune/general/gen061.svg */}
                                    <span className='svg-icon svg-icon-3'>
                                        <FontAwesomeIcon icon={item?.icon} />
                                    </span>
                                    {/* end::Svg Icon */}
                                </span>
                                <span className='menu-title'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>{/* 0 : fislt letter + 1 : character two */}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

ThemeSetting.prototype = {
    option: PropTypes.object.isRequired,
    setThemeSettings: PropTypes.object.isRequired,
}

export default ThemeSetting;
