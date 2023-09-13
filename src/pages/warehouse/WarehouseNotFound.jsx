import React from 'react'
import { useSelector } from 'react-redux';
import { NotFound } from '~/components/error';
import { MSG_ERROR } from '~/constants/AppConstant';
import { getErrorWarehouse } from '~/redux/selectors';

const WarehouseNotFound = () => {

    const error = useSelector(getErrorWarehouse);

    return (
        <NotFound
            msg={error?.isError ? error?.msg : MSG_ERROR.NOT_FOUND}
        />
    )
}

export default WarehouseNotFound;
