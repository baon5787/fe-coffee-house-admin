import React from 'react'
import { useSelector } from 'react-redux';
import { NotFound } from '~/components/error';
import { MSG_ERROR } from '~/constants/AppConstant';
import { errorCategorySelector, titleErrorCategorySelector } from '~/redux/selectors';

const CategoryNotFound = () => {

    const error = useSelector(errorCategorySelector);

    const msg = useSelector(titleErrorCategorySelector);

    return (
        <NotFound
            msg={error ? msg : MSG_ERROR.NOT_FOUND}
        />
    )
}

export default CategoryNotFound;
