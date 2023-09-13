import React, { useRef } from 'react'
import { Sidebar } from '../components';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    const sidebarRef = useRef();

    return (
        <>
            <div className="page d-flex flex-row flex-column-fluid">
                <Sidebar ref={sidebarRef} />
                <Outlet context={{ sidebarRef: sidebarRef }} />
            </div>
        </>
    )
}

export default DefaultLayout;