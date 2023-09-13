import React, { useEffect, useState } from 'react'
import Selects from '../select';
import { isEmptyArray } from 'formik';
import { defaultSearchStatusChange, searchStatusChange } from '~/redux/slice/FiltersSlice';
import { DEFAULT_STATUS } from '~/constants/AppConstant';
import { useSelector } from 'react-redux';
import { orderStatusSelector, searchStatusSelector } from '~/redux/selectors';
import { getSelectOrderStatuses } from '~/api/ApiSelect';
import { sortSelect } from '~/utils/HandleTable';
import useJwt from '~/hooks/useJwt';

const SearchOrderStatus = () => {

    const orderStatuses = useSelector(orderStatusSelector);

    const filters = useSelector(searchStatusSelector)

    const { accessToken, dispatch, axiosJwt } = useJwt();

    const [allOrderStatus, setAllOrderStatus] = useState([]);

    const [value, setValue] = useState(DEFAULT_STATUS);

    useEffect(() => {
        if (isEmptyArray(orderStatuses)) {
            getSelectOrderStatuses(accessToken, dispatch, axiosJwt).then((data) => {
                setAllOrderStatus(sortSelect([...data, DEFAULT_STATUS]))
            });
        } else {
            setAllOrderStatus(sortSelect([...orderStatuses, DEFAULT_STATUS]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, allOrderStatus])

    const updateValue = () => {
        if (isEmptyArray(allOrderStatus)) return;
        const status = filters ? filters : DEFAULT_STATUS.value;
        const optionStatus = allOrderStatus.filter(option => option?.value === status);
        setValue(optionStatus);
    }

    const handleSreachStatusChange = (option) => option === DEFAULT_STATUS.value
        ? dispatch(defaultSearchStatusChange()) : dispatch(searchStatusChange(option));

    if (isEmptyArray(allOrderStatus)) return;

    return (
        <>
            <div className='w-100 mw-150px'>
                <Selects
                    options={allOrderStatus}
                    onChange={(option) => {
                        handleSreachStatusChange(option.value);
                    }}
                    value={value}
                />
            </div>
        </>
    )
}

export default SearchOrderStatus