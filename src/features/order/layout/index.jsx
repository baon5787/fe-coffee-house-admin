import React from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Wrapper from '~/components/wrapper';
import { getTitlePageOrder } from '~/utils/HandleTitlePage';

const OrderLayout = () => {
    const location = useLocation();
    const { code } = useParams();
    const titlePageOrder = getTitlePageOrder(location.pathname, code);

    return (
        <Wrapper titlePage={titlePageOrder}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default OrderLayout;