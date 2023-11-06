import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react/headless';
import React, { useEffect, useState } from 'react'
import { THEME, THEME_NAME } from '~/constants/AppConstant'
import useMode from '~/hooks/useMode';
import ThemeSetting from './ThemeSetting';

const Theme = () => {

    const [themeSettings, setThemeSettings] = useState(false);

    const { theme, setTheme } = useMode();

    const handleTheme = (name) => {
        if (!name) return;
        setThemeSettings(true);
        setTheme(name);
    }

    useEffect(() => {
        if (themeSettings) {
            setThemeSettings(!themeSettings);
        }
    }, [themeSettings])

    const renderResult = (attrs) => (
        <ThemeSetting attrs={attrs} tabIndex={"-1"}
            theme={theme}
            onTheme={handleTheme}
        />
    );

    return (
        <div className='ml-2 lg:ml-3'>
            <Tippy
                interactive
                trigger={'click'}
                placement="bottom-end"
                render={renderResult}
                disabled={themeSettings}
                offset={[0, 0]}
            >
                <div className='btn btn-icon !w-[35px] !h-[35px] md:!w-[40px] md:!h-[40px]'>
                    {
                        THEME?.map((item, index) => {
                            return (item.name === THEME_NAME.LIGHT || item.name === THEME_NAME.DARK) && (
                                <span key={index}
                                    className={
                                        `svg-icon ${item?.name === THEME_NAME.DARK
                                            ? 'theme-light:hidden'
                                            : 'theme-dark:hidden'
                                        }`
                                    }>
                                    <FontAwesomeIcon icon={item?.icon} className='w-6 h-6' />
                                </span>
                            )
                        })
                    }
                </div>
            </Tippy>
        </div>
    )
}

export default Theme