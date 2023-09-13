import React, { useEffect, useState } from 'react'
import Selects from '../select';
import { DEFAULT_STATUS } from '~/constants/AppConstant';
import { getSelectCouponStatues } from '~/api/ApiSelect';
import { useSelector } from 'react-redux';
import { couponStatusSelector, searchStatusSelector } from '~/redux/selectors';
import { sortSelect } from '~/utils/HandleTable';
import { defaultSearchStatusChange, searchStatusChange } from '~/redux/slice/FiltersSlice';
import useJwt from '~/hooks/useJwt';
import { isEmptyArray } from '~/utils/CheckValue';

const SearchCouponStatus = () => {

    const couponStatus = useSelector(couponStatusSelector);

    const filters = useSelector(searchStatusSelector)

    const { accessToken, dispatch, axiosJwt } = useJwt();

    const [allCouponStatus, setAllCouponStatus] = useState([]);

    const [value, setValue] = useState(DEFAULT_STATUS);

    useEffect(() => {
        if (isEmptyArray(couponStatus)) {
            getSelectCouponStatues(accessToken, dispatch, axiosJwt).then((data) => {
                setAllCouponStatus(sortSelect([...data, DEFAULT_STATUS]))
            });
        } else {
            setAllCouponStatus(sortSelect([...couponStatus, DEFAULT_STATUS]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, allCouponStatus])

    const updateValue = () => {
        if (isEmptyArray(allCouponStatus)) return;
        const status = filters ? filters : DEFAULT_STATUS.value;
        const optionStatus = allCouponStatus.filter(option => option?.value === status);
        setValue(optionStatus);
    }

    const handleSreachStatusChange = (option) => option === DEFAULT_STATUS.value
        ? dispatch(defaultSearchStatusChange()) : dispatch(searchStatusChange(option))

    if (isEmptyArray(allCouponStatus)) return;

    return (
        <>
            <div className='w-100 mw-150px'>
                <Selects
                    options={allCouponStatus}
                    onChange={(option) => {
                        handleSreachStatusChange(option.value);
                    }}
                    value={value}
                />
            </div>
        </>
    )
}

export default SearchCouponStatus;
