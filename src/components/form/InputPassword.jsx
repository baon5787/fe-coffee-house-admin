import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

const InputPassword = ({ className, register, ...inputProps }) => {
    const [isHide, setIsHide] = useState(false);
    return (
        <div className='relative mb-3'>
            <input
                className={className}
                type={isHide ? 'text' : 'password'}
                {...inputProps}
                {...register}
            />
            <span className='svg-icon btn btn-icon w-[calc(1.5em+1.1rem+2px)] h-[calc(1.5em+1.1rem+2px)] -mr-2 absolute top-0 right-2 translate-middle !text-text-theme-muted'>
                <FontAwesomeIcon icon={isHide ? faEye : faEyeSlash}
                    onClick={() => setIsHide(!isHide)}
                />
            </span>
        </div>
    )
}

export default InputPassword