import Tippy from '@tippyjs/react/headless'
import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { ArrowIcon } from '../icons';
import Menu from './Menu';

const Actions = ({ onEditOrEnableClick, onDeleteOrDisenableClick, title }) => {

    const [isOpen, setOpen] = useState(false);

    const renderResult = (attrs) => (
        <Menu attrs={attrs} tabIndex={"-1"}
            onEditOrEnableClick={onEditOrEnableClick}
            onDeleteOrDisenableClick={onDeleteOrDisenableClick}
            title={title}
        />
    );

    const ref = useRef();

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
        <>
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
        </>
    )
}

Actions.propTypes = {
    onEditOrEnableClick: PropTypes.func.isRequired,
    onDeleteOrDisenableClick: PropTypes.func.isRequired,
}

export default Actions;
