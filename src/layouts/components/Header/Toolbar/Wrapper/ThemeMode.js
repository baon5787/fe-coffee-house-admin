import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import Tippy from '@tippyjs/react/headless';

import ThemeSetting from '~/components/ThemeSetting'


const LIGHT = "light";
const DARK = "dark";
const SYSTEM = "system";


const option = [
    {
        name: LIGHT,
        icon: BsSun
    },
    {
        name: DARK,
        icon: BsMoonStars
    },
    {
        name: SYSTEM,
        icon: BsSun
    }
];

const ThemeMode = () => {

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
                        {option.map((item, index) => {
                            return (item.name === LIGHT || item.name === DARK) && (
                                <span key={index} className={`svg-icon svg-icon-2 ${item.name === DARK ? 'theme-dark-show' : 'theme-light-show'}`}>
                                    <item.icon size={24} />
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

export default ThemeMode;
