import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Wrapper from '~/components/wrapper';
import { getTitlePageCategory } from '~/utils/HandleTitlePage';

const CategoryLayout = () => {

    const location = useLocation();

    const titlePageWareHouse = getTitlePageCategory(location.pathname);

    return (
        <Wrapper titlePage={titlePageWareHouse}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default CategoryLayout;