import Tippy from '@tippyjs/react/headless'
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../Icons'
import Menu from './Menu'

const Actions = ({ deleteMess, editProduct }) => {

    const renderResult = (attrs) => (
        <Menu attrs={attrs} tabIndex={"-1"} deleteMess={deleteMess} editProduct={editProduct} />
    );

    return (
        <>
            <Tippy
                interactive
                trigger={'click '}
                placement="bottom-end"
                render={renderResult}
            >
                <Link className='btn btn-sm btn-light btn-active-light-primary'>
                    Actions
                    <span className='svg-icon svg-icon-5 m-0'>
                        <ArrowIcon size={24} />
                    </span>
                </Link>
            </Tippy>
        </>
    )
}

export default Actions;
