import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const InputPassword = ({ className, values, ...inputProps }) => {
    const [value, setValue] = useState(values);
    const [isHide, setIsHide] = useState(false);

    const handleInputChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        setValue(values);
    }, [values])
    return (
        <div className='position-relative mb-3'>
            <input className={className}
                type={isHide ? 'text' : 'password'}
                value={value}
                onChange={handleInputChange}
                {...inputProps}
            />
            <span className='svg-icon btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'>
                <FontAwesomeIcon icon={isHide ? faEye : faEyeSlash}
                    onClick={() => setIsHide(!isHide)}
                />
            </span>
        </div>
    )
}

InputPassword.propTypes = {
    className: PropTypes.string.isRequired,
    values: PropTypes.string,
}

export default InputPassword;
