import React, { useLayoutEffect, useRef } from 'react'
import Aside from '../components/aside'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    const asideRef = useRef();

    useLayoutEffect(() => {

        document.body.removeAttribute('class');

        const root = document.getElementById('root');

        if (root?.className === 'page') return;

        root.removeAttribute('class');
        root.classList.add('page');
    }, [])

    return (
        <>
            <Aside
                asideRef={asideRef}
            />
            <Outlet context={{ asideRef: asideRef }} />
            <Footer />
        </>
    )
}

export default DefaultLayout