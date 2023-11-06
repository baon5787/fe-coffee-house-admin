import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import logos from '~/assets/image/logos'

const LogoBar = ({ iconMenuRef }) => {

    return (
        <div className='flex items-center grow'>
            <div className='btn btn-icon rounded-circle -ml-2 mr-1 btn-active-light-primary'
                ref={iconMenuRef}
            >
                <FontAwesomeIcon icon={faBars} className='text-1 text-text-theme-muted' />
            </div>
            <img src={logos.img} alt="logo" className='max-h-[40px]' />
        </div>
    )
}

export default LogoBar