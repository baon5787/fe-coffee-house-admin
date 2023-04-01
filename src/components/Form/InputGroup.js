import React from 'react'

const InputGroup = ({ children, className }) => {
    return (
        <div className={`fv-row fv-plugins-icon-container ${className}`}>
            {children}
        </div>
    )
}

export default InputGroup;
