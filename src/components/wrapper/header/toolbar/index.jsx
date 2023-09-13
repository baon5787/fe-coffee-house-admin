import React from 'react'
import Theme from "./components/theme";
import User from "./components/user";

const Toolbar = () => {
    return (
        <div className='d-flex align-items-center flex-shrink-0'>
            <Theme />
            <User />
        </div>
    )
}

export default Toolbar;