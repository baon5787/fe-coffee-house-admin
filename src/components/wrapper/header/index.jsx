import React, { forwardRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMenu } from '~/redux/slice/DimensionsSlice';
import logos from '~/images/logos';
import Toolbar from './toolbar';
import style from '../style/Scroll.module.css'


const Header = (props, ref) => {


    const dispatch = useDispatch();

    const { children, isScroll, className } = props;

    return (
        <>
            <header className={`${isScroll ? `${style.scroll} sticky` : ''}`}>
                {/* begin::Container */}
                <div className={`container-fluid d-flex align-items-stretch ${className}`}>
                    {/* begin::Page title */}
                    {children}
                    {/* end::Page title */}
                    {/* begin::Logo bar */}
                    <div className='d-flex d-lg-none align-items-center flex-grow-1'>
                        <div className='btn btn-icon btn-circle btn-active-light-primary ms-n2 me-1'
                            ref={ref}
                            onClick={() => dispatch(toggleMenu())}
                        >
                            <span className='svg-icon svg-icon-2x' >
                                {/* <TfiMenu></TfiMenu> */}
                            </span>
                        </div>
                        <Link to={'/'} className='d-lg-none'>
                            <img alt="Logo" src={logos.logo} className='max-h-40px' />
                        </Link>
                    </div>
                    {/* end::Logo bar */}
                    {/* begin::Toolbar wrapper */}
                    <Toolbar />
                    {/* end::Toolbar wrapper */}
                </div>
                {/* end::Container */}
            </header>
        </>
    )
}

export default forwardRef(Header);
