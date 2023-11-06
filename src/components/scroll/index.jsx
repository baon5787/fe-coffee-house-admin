import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { createPortal } from 'react-dom'

const Scroll = () => {

    const handleScrollTop = () => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });

    return createPortal(
        <div className='scrolltop'
            onClick={() => handleScrollTop()}
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </div>,
        document.querySelector('body'),
    )
}

export default Scroll