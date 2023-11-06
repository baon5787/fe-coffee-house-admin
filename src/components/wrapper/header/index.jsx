import React, { useLayoutEffect, useState } from 'react'
import ToolBar from './toolbar'
import LogoBar from './logobar';
import { useSelector } from 'react-redux';
import { isDimensionsSelector } from '~/redux/selectors';
import { OFFSET } from '~/constants/AppConstant';
import Scroll from '~/components/scroll';

const Header = ({ iconMenuRef, children }) => {
    const isDimensions = useSelector(isDimensionsSelector);

    const [isScroll, setIsScroll] = useState(false);

    useLayoutEffect(() => {
        const handleScroll = () => setIsScroll(window.scrollY >= OFFSET);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <>
            <header data-kt-sticky={isScroll ? 'on' : 'off'}>
                {
                    isDimensions ? <LogoBar iconMenuRef={iconMenuRef} /> : children
                }
                <ToolBar></ToolBar>
            </header>
            {isScroll && <Scroll />}
        </>
    )
}

export default Header