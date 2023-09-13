import React, { useEffect, useRef } from 'react'
import Header from './header';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import { isSideBarSelector } from '~/redux/selectors';
import useWindowDimensions from '~/hooks/useWindowDimensions';
import PageTitle from './pagetitle';
import { useOutletContext } from 'react-router-dom';
import { toggleMenu } from '~/redux/slice/DimensionsSlice';
import PropTypes from 'prop-types';
import style from './style/Scroll.module.css';
import { ScrollTopIcon } from '../icons/Icons';

const Wrapper = ({ children, titlePage }) => {

    const isDimensions = useWindowDimensions();

    const isSideBar = useSelector(isSideBarSelector);

    const menuRef = useRef();

    const dispatch = useDispatch();

    const { sidebarRef, isScroll } = useOutletContext();

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current.contains(e.target)) return;

            if (!sidebarRef.current.contains(e.target) && isSideBar && isDimensions) {
                dispatch(toggleMenu());
                return;
            }
        }
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSideBar])

    if (!sidebarRef) return;

    return (
        <>
            <div className='wrapper d-flex flex-column flex-row-fluid'>
                <Header
                    ref={menuRef}
                    isScroll={isScroll}
                    className={titlePage ? 'justify-content-between' : 'justify-content-end'}
                >
                    {
                        !isDimensions && titlePage && <PageTitle titlePage={titlePage} />
                    }
                </Header>
                <div className={`d-flex flex-column flex-column-fluid fs-6 ${titlePage ? 'content' : ''}`}>
                    <div className=' container-xxl'>
                        {
                            isDimensions && titlePage && <PageTitle titlePage={titlePage} />
                        }
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
            <div className={`scrolltop ${isScroll ? style.on : ''}`}>
                <span className='svg-icon'>
                    <ScrollTopIcon size={24} />
                </span>
            </div>
        </>
    )
}

Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
    titlePage: PropTypes.object,
}

export default Wrapper;
