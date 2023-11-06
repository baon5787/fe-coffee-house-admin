import React from 'react'
import Tippy from '@tippyjs/react/headless'
import UserProfile from './UserProfile';
import logos from '~/assets/image/logos';

const User = () => {

    const renderResult = (attrs) => (
        <UserProfile attrs={attrs} />
    );

    return (
        <Tippy
            trigger={'click'}
            interactive
            placement='bottom-end'
            render={renderResult}
            offset={[0, 0]}
        >
            <div className='ml-2 lg:ml-3' >
                <div className={`cursor-pointer symbol rounded-[50%] !w-[35px] !h-[35px] md:!w-[40px] md:!h-[40px]`}>
                    <img alt='Pic' src={logos.img}></img>
                </div>
            </div>
        </Tippy>
    )
}

export default User