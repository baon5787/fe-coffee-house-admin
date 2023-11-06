import { useEffect, useState } from 'react'
import { THEME_NAME } from '~/constants/AppConstant';

const useMode = () => {
    const onWindownTheme = () => {
        var themeMode;

        if (document.documentElement) {
            if (localStorage.getItem("data-bs-theme") !== null) {
                themeMode = localStorage.getItem("data-bs-theme");
            } else {
                themeMode = THEME_NAME.LIGHT;
            }

            if (themeMode === THEME_NAME.SYSTEM) {
                themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? THEME_NAME.DARK
                    : THEME_NAME.LIGHT;
            }
        }
        document.documentElement.setAttribute("data-bs-theme", themeMode);
        return themeMode;
    }

    const setThemeMode = () => {
        setTheme(theme);
        if (theme === THEME_NAME.SYSTEM) {
            localStorage.setItem("data-bs-theme", THEME_NAME.LIGHT);
        } else {
            localStorage.setItem("data-bs-theme", theme);
            document.documentElement.setAttribute("data-bs-theme", theme);
        }
    }

    const [theme, setTheme] = useState(onWindownTheme());

    useEffect(() => {

        switch (theme) {

            case THEME_NAME.LIGHT: {
                setThemeMode();
                break;
            }
            case THEME_NAME.DARK: {
                setThemeMode();
                break;
            }
            case THEME_NAME.SYSTEM: {
                setThemeMode();
                break;
            }

            default:
                onWindownTheme();
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme])

    return {
        theme,
        setTheme
    }
}

export default useMode