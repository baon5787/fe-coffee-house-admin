import React from 'react'
import NotFound from '~/components/notfound';
import { MSG_ERROR } from '~/constants/AppConstant';
import { useProduct } from '~/features/product';

const ProductNotFound = () => {

    const { error, msg } = useProduct();

    return (
        <NotFound
            msg={error ? msg : MSG_ERROR.NOT_FOUND}
        />
    )
}

export default ProductNotFound