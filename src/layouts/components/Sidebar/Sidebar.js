import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuItem } from './Menu'
import { AiOutlineUser } from 'react-icons/ai';
import { IoFingerPrintSharp } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import logos from '~/images/logos';

const Sidebar = () => {
    return (
        <>
            <div
                className={`aside`}
            >
                {/* begin::Brand*/}
                <div className='aside-logo flex-column-auto pt-9 pb-7 px-9'>
                    <Link to="/">
                        <img alt="Logo" src={logos.logo}
                            className='max-h-50px logo-default'
                        />
                        <img alt="Logo" src={logos.nologo}
                            className='max-h-50px logo-minimize'
                        />
                    </Link>
                </div>
                {/* end::Brand*/}
                {/* begin::Menu*/}
                <Menu>
                    <MenuItem title={"Dashboards"} icon={<RxDashboard />}
                        data={[
                            {
                                title: "Logistics",
                                to: 'contact'
                            },
                            {
                                title: "eCommerce"
                            }
                        ]}
                    ></MenuItem>
                    <MenuItem title={"User"} icon={<AiOutlineUser />}
                        data={[
                            {
                                title: "Overview",
                            },
                            {
                                title: "Settings"
                            }
                        ]}
                    ></MenuItem>
                    <MenuItem title={"Authentication"} icon={<IoFingerPrintSharp />}></MenuItem>
                </Menu>
            </div>
        </>
    )
}

export default Sidebar;
