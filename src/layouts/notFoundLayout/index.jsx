import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '~/components/wrapper'

const NotFoundLayout = () => {
    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    )
}

export default NotFoundLayout