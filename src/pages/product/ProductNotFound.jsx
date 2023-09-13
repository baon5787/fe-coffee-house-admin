import React from 'react'
import { useSelector } from 'react-redux';
import { NotFound } from '~/components/error';
import { MSG_ERROR } from '~/constants/AppConstant';
import { errorProductSelector, titleErrorProductSelector } from '~/redux/selectors';

const ProductNotFound = () => {
    const error = useSelector(errorProductSelector);

    const msg = useSelector(titleErrorProductSelector);

    return (
        <NotFound
            msg={error ? msg : MSG_ERROR.NOT_FOUND}
        />
    )
}

export default ProductNotFound;
