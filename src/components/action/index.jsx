import React, { useRef, useState } from 'react'
import { ArrowIcon } from '../icons';
import Tippy from '@tippyjs/react';

const Action = ({ onEditOrEnableClick, onDeleteOrDisenableClick, title }) => {
    const [isOpen, setOpen] = useState(false);

    const renderResult = (attrs) => (
        <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4 show'>
            <div className='menu-item px-3'>
                <div className='menu-link px-3' onClick={onEditOrEnableClick}>{title}</div>
            </div>
            <div className='menu-item px-3'>
                <div className='menu-link px-3' onClick={onDeleteOrDisenableClick}>Delete</div>
            </div>
        </div>
    );

    const ref = useRef

    const handleOnClick = (e) => {
        const current = ref.current;
        if (current === null || current === undefined) {
            return window.removeEventListener("click", handleOnClick);
        }
        if (!ref.current.contains(e.target) && isOpen) {
            setOpen(false)
            return window.removeEventListener("click", handleOnClick);
        }
    }

    window.addEventListener("click", handleOnClick);
    return (
        <Tippy
            interactive
            placement="bottom-end"
            render={renderResult}
            visible={isOpen}
        >
            <div className='btn btn-sm btn-light btn-active-light-primary'
                onClick={() => setOpen(true)}
                ref={ref}
            >
                Actions
                <span className='svg-icon svg-icon-5 m-0'>
                    <ArrowIcon size={24} />
                </span>
            </div>
        </Tippy>
    )
}

export default Action;
