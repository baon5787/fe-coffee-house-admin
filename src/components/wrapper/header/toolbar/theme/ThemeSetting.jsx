import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { THEME } from '~/constants/AppConstant'

const ThemeSetting = ({ onTheme, theme }) => {
    return (
        <ul className='menu menu-sub menu-sub-dropdown text-base font-medium menu-state-color w-[150px] py-4'>
            {
                THEME.map((item, index) => {
                    return (
                        <li key={index} className='menu-item !px-3 !my-0 text-text-gray-700'
                            onClick={() => onTheme(item?.name)}
                        >
                            <span className={`menu-link !inset-[0.5rem_0.75rem] ${theme === item.name ? 'active' : ''}`}>
                                <span className='w-8 mr-2'>
                                    <FontAwesomeIcon icon={item?.icon}
                                        className='w-6 h-6'
                                    />
                                </span>
                                <span className='flex-grow'>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </span>
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ThemeSetting