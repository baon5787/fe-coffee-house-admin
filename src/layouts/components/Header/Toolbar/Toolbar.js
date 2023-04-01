import React from 'react'
import { ThemeMode, User } from './Wrapper';

const Toolbar = () => {
    return (
        <div className='d-flex align-items-center flex-shrink-0'>
            <ThemeMode></ThemeMode>
            <User></User>
        </div>
    )
}

export default Toolbar;
