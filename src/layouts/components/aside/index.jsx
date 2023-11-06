import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from './sidebar'
import { useSelector } from 'react-redux'
import { isDimensionsSelector, isAsideSelector } from '~/redux/selectors'
import logos from '~/assets/image/logos'


const Aside = ({ asideRef }) => {

    const isDimensions = useSelector(isDimensionsSelector);
    const isAside = useSelector(isAsideSelector)

    return (
        <aside className={`${isDimensions ? isAside ? 'drawer drawer-start drawer-on' : 'drawer drawer-start' : ''}`}
            ref={asideRef}
        >
            <Link to={'/index'} className='aside__logo'>
                <img src={logos.img} alt="" className='aside__logo--img' />
                <h2 className='aside__logo--title'>COFFEE SHOP</h2>
            </Link>
            <SideBar />
        </aside>
    )
}

export default Aside