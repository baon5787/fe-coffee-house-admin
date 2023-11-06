import React from 'react'
import Theme from './theme'
import User from './user'

const ToolBar = () => {
    return (
        <div className='flex items-center'>
            <Theme></Theme>
            <User></User>
        </div>
    )
}

export default ToolBar