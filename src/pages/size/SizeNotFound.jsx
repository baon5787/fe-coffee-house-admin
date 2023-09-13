import React from 'react'
import { useSelector } from 'react-redux';
import { NotFound } from '~/components/error';
import { MSG_ERROR } from '~/constants/AppConstant';
import { getErrorSize } from '~/redux/selectors';

const SizeNotFound = () => {

    const error = useSelector(getErrorSize);

    return (
        <NotFound
            msg={error?.isError ? error?.msg : MSG_ERROR.NOT_FOUND}
        />
    )
}

export default SizeNotFound;
