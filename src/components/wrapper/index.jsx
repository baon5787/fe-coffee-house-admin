import React, { useEffect, useRef } from 'react'
import Header from './header'
import PageTitle from './pagetitle';
import useWindowDimensions from '~/hooks/useWindowDimensions';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '~/redux/slice/DimensionsSlice';
import { isAsideSelector } from '~/redux/selectors';


const Wrapper = ({ children, titlePage }) => {
    const isDimensions = useWindowDimensions();

    const { asideRef } = useOutletContext();

    const isAside = useSelector(isAsideSelector);

    const dispatch = useDispatch();

    const iconMenuRef = useRef();

    useEffect(() => {
        const hanldeMenu = (e) => {
            if (iconMenuRef?.current?.contains(e.target)) {
                dispatch(toggleMenu())
                return;
            }

            if (!asideRef?.current?.contains(e.target) && isAside) {
                dispatch(toggleMenu());
                return;
            }
        }

        window.addEventListener('click', hanldeMenu);
        return () => window.removeEventListener('click', hanldeMenu);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAside])

    return (
        <>
            <Header iconMenuRef={iconMenuRef}>
                <PageTitle />
            </Header>
            <main>
                {
                    isDimensions && <PageTitle />
                }
                {children}
            </main>
        </>
    )
}

export default Wrapper