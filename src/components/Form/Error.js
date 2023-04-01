import React from 'react'

const Error = ({ title }) => {
    return (
        <>
            <div className='fv-plugins-message-container invalid-feedback'>
                <div>{title}</div>
            </div>
        </>
    )
}

export default Error;
