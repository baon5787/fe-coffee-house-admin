import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className='text-text-theme-dark order-2'>
                <span className='text-text-gray-400 mr-1'>Created by</span>
                <Link className='text-text-theme-muted text-6'>Keenthemes</Link>
            </div>
            <ul className='menu text-text-gray-600 order-1'>
                <li className='menu-tem'>
                    <div className='menu-link px-2'>About</div>
                </li>
                <li className='menu-tem'>
                    <div className='menu-link px-2'>About</div>
                </li>
                <li className='menu-tem'>
                    <div className='menu-link px-2'>About</div>
                </li>
            </ul>
        </footer>
    )
}

export default Footer