import React from 'react'
import { useSelector } from 'react-redux';
import { NotFound } from '~/components/error';
import { MSG_ERROR } from '~/constants/AppConstant';
import { errorProductSizeSelector, titleErrorProductSizeSelector } from '~/redux/selectors';

const ProductSizeNotFound = () => {

    const error = useSelector(errorProductSizeSelector);

    const msg = useSelector(titleErrorProductSizeSelector);

    return (
        <NotFound
            msg={error ? msg : MSG_ERROR.NOT_FOUND}
        />
    )
}

export default ProductSizeNotFound;
