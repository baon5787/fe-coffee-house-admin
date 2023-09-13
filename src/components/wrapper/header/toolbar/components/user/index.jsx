import React from 'react'
import Tippy from "@tippyjs/react";
import UserProfile from "./UserProfile";

const User = () => {

    const renderResult = (attrs) => (
        <UserProfile attrs={attrs} />
    );

    return (
        <>
            <Tippy
                interactive
                trigger={'click '}
                placement='bottom-end'
                render={renderResult}
            >
                <div className='d-flex align-items-center ms-2 ms-lg-3' >
                    <div className={`cursor-pointer symbol symbol-circle symbol-35px symbol-md-40px`}>
                        <img alt='Pic' src='/media/avatars/150-20.jpg'></img>
                    </div>
                </div>
            </Tippy>

        </>
    )
}

export default User;