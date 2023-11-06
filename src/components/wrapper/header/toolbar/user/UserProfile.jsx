import React from 'react'
import { Link } from 'react-router-dom'
import logos from '~/assets/image/logos'
import { USERS } from '~/constants/AppConstant'

const UserProfile = () => {
    return (
        <ul className='menu menu-sub menu-sub-dropdown menu-state-bg text-gray-800 font-medium py-4 text-6 w-[275px]'>
            <li className='menu-item !px-3'>
                <div className='flex items-center p-[0.65rem_1rem] px-3'>
                    <div className='symbol pr-5 w-[50px] h-[50px]'>
                        <img src={logos.img} alt="Logo" />
                    </div>
                    <span className='!text-5 !font-semibold text-theme-white'>Nguyen Dinh Bao</span>
                </div>
            </li>
            <li className='separator my-2'></li>
            {
                USERS?.map((item, index) => {
                    return (
                        <li className='menu-item px-5' key={index}>
                            <Link to={item?.to} className='menu-link !px-5'>
                                {item?.name}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UserProfile