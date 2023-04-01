import React from 'react'
import Title from '~/components/Title'
import LogoBar from './LogoBar'
import Toolbar from './Toolbar'

const Header = () => {
    return (
        <>
            <div id="kt_header" className='header'>
                {/* begin::Container */}
                <div className='container-fluid d-flex align-items-stretch justify-content-between'>
                    {/* begin::Page title */}
                    <Title />
                    {/* end::Page title */}
                    {/* begin::Logo bar */}
                    <LogoBar />
                    {/* end::Logo bar */}
                    {/* begin::Toolbar wrapper */}
                    <Toolbar />
                    {/* end::Toolbar wrapper */}
                </div>
                {/* end::Container */}
            </div>
        </>
    )
}

export default Header;
