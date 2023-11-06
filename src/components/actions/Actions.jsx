import Tippy from '@tippyjs/react/headless';
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Menu from './components/Menu';

const Actions = ({ onEditOrEnableClick, onDeleteOrDisenableClick, title }) => {
    const ref = useRef();

    const [isOpen, setOpen] = useState(false);

    const renderResult = (attrs) => (
        <Menu attrs={attrs} tabIndex={"-1"}
            onEditOrEnableClick={onEditOrEnableClick}
            onDeleteOrDisenableClick={onDeleteOrDisenableClick}
            title={title}
        />
    );

    useEffect(() => {
        const handleClick = (e) => {
            if (ref?.current?.contains(e.target) && !isOpen) {
                setOpen(!isOpen)
            }

            if (!ref?.current?.contains(e.target) && isOpen) {
                setOpen(!isOpen)
            }
        }

        window.addEventListener('click', handleClick);

        return () => window.removeEventListener('click', handleClick);
    }, [isOpen])

    return (
        <Tippy
            interactive
            placement="bottom-end"
            render={renderResult}
            visible={isOpen}
        >
            <div className='btn btn-light btn-active-light-primary p-btn-sm'
                onClick={() => setOpen(true)}
                ref={ref}
            >
                Actions
                <FontAwesomeIcon
                    icon={faAngleUp}
                    rotation={180}
                    className='text-5 pr-[0.35rem] ml-1 text-theme-light-inverse'
                />
            </div>
        </Tippy>
    )
}

Actions.propTypes = {
    onEditOrEnableClick: PropTypes.func.isRequired,
    onDeleteOrDisenableClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}


export default Actions