import React from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Wrapper from '~/components/wrapper';
import { getTitlePageProduct } from '~/utils/HandleTitlePage';

const ProductLayout = () => {
    const location = useLocation();
    const { sku } = useParams();
    const titlePageProduct = getTitlePageProduct(location.pathname, sku);

    return (
        <Wrapper titlePage={titlePageProduct}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default ProductLayout;
