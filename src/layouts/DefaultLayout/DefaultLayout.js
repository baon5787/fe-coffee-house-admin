import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DefaultLayout = () => {
    return (
        <>
            <div className="page d-flex flex-row flex-column-fluid">
                <Sidebar />
                <div className='wrapper d-flex flex-column flex-row-fluid' id="kt_wrapper">
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout;
