import React from 'react'
import { Link } from 'react-router-dom';

const MenuSub = ({ data = [], menu, to }) => {
    return (
        <>
            <div className={`menu-sub menu-sub-accordion ${menu && 'show'} `}>
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className='menu-item'>
                                <Link className='menu-link' to={to}>
                                    <span className='menu-bullet'>
                                        <span className='bullet bullet-dot'></span>
                                    </span>
                                    <span className='menu-title'>{item.title}</span>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MenuSub;
