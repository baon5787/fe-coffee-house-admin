import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Wrapper from '~/components/wrapper';

const CategoryLayout = () => {
    const location = useLocation();
    return (
        <Wrapper >
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default CategoryLayout