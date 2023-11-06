import React from 'react'

const Thead = ({ children }) => {
    return (
        <thead>
            <tr className='text-start text-text-gray-400 font-semibold text-7 uppercase'>
                {children}
            </tr>
        </thead>
    )
}

export default Thead