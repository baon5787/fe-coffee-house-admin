import React from 'react'
import NotFound from '~/components/notfound'
import { MSG_ERROR } from '~/constants/AppConstant'
import { useCategory } from '~/features/categories';

const CategoryNotFound = () => {

    const { error, msg } = useCategory();

    console.log('a');

    return (
        <NotFound
            msg={error ? msg : MSG_ERROR.NOT_FOUND}
        />
    )
}

export default CategoryNotFound