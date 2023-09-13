import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Wrapper from '~/components/wrapper';
import { getTitlePageSize } from '~/utils/HandleTitlePage';

const SizeLayout = () => {

    const location = useLocation();

    const titlePageSize = getTitlePageSize(location.pathname);

    return (
        <Wrapper titlePage={titlePageSize}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default SizeLayout;