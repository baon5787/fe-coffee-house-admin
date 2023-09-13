import React, { useEffect, useState } from 'react'
import { DEFAULT_STATUS } from '~/constants/AppConstant';
import { useSelector } from 'react-redux';
import { searchStatusSelector, statusSelector } from '~/redux/selectors';
import { defaultSearchStatusChange, searchStatusChange } from '~/redux/slice/FiltersSlice';
import { getSelectStatuses } from '~/api/ApiSelect';
import { sortSelect } from '~/utils/HandleTable';
import Selects from '../select';
import useJwt from '~/hooks/useJwt';
import { isEmptyArray } from '~/utils/CheckValue';

const SearchStatus = () => {

    const filters = useSelector(searchStatusSelector);

    const status = useSelector(statusSelector);

    const { accessToken, dispatch, axiosJwt } = useJwt();

    const [allStatus, setAllStatus] = useState([]);

    const [value, setValue] = useState(DEFAULT_STATUS);

    useEffect(() => {
        if (isEmptyArray(status)) {
            getSelectStatuses(accessToken, dispatch, axiosJwt).then((data) => {
                setAllStatus(sortSelect([...data, DEFAULT_STATUS]))
            });
        }
        else {
            setAllStatus(sortSelect([...status, DEFAULT_STATUS]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, allStatus])

    const updateValue = () => {
        if (isEmptyArray(allStatus)) return;
        const status = filters ? filters : DEFAULT_STATUS.value;
        const optionStatus = allStatus.filter(option => option?.value === status);
        setValue(optionStatus);
    }

    const handleSreachStatusChange = (option) => option === DEFAULT_STATUS.value
        ? dispatch(defaultSearchStatusChange()) : dispatch(searchStatusChange(option))

    if (isEmptyArray(allStatus)) return;

    return (
        <>
            <div className='w-100 mw-150px'>
                <Selects
                    options={allStatus}
                    onChange={(option) => {
                        handleSreachStatusChange(option.value);
                    }}
                    value={value}
                />
            </div>
        </>
    )
}

export default SearchStatus;
