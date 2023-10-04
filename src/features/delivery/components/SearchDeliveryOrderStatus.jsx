import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSelectOrderStatuses } from '~/api/ApiSelect';
import { createAxios } from '~/api/AxiosClient';
import Selects from '~/components/select';
import { DEFAULT_STATUS, OPTION_PAGE, ORDER_STATUS } from '~/constants/AppConstant';
import { ERROR } from '~/constants/Paths';
import { orderStatusSelector, searchStatusSelector, userSelector } from '~/redux/selectors';
import { loginSuccess } from '~/redux/slice/AuthSlice';
import { defaultSearchStatusChange, searchStatusChange } from '~/redux/slice/FiltersSlice';
import { isEmptyArray } from '~/utils/CheckValue';
import { sortSelect } from '~/utils/HandleTable';
import { getOrderStatusesByTwoStatus } from '~/utils/HandleValue';

const SearchDeliveryOrderStatus = ({ option }) => {

    const orderStatuses = useSelector(orderStatusSelector);

    const filters = useSelector(searchStatusSelector)

    const user = useSelector(userSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let axiosJwt = createAxios(user, dispatch, loginSuccess, navigate);

    const [allOrderStatus, setAllOrderStatus] = useState([]);

    const [value, setValue] = useState(DEFAULT_STATUS);

    useEffect(() => {
        let listOrderStatus = orderStatuses;
        let statuses;

        if (isEmptyArray(orderStatuses)) {
            getSelectOrderStatuses(user?.accessToken, dispatch, axiosJwt).then((data) => {
                if (data === ERROR) return;
                listOrderStatus = data;
            });
        }

        if (isEmptyArray(listOrderStatus)) return;

        if (option === OPTION_PAGE.UNACCOMPLISHED) {
            statuses = getOrderStatusesByTwoStatus(listOrderStatus, ORDER_STATUS.PROCESSING,
                ORDER_STATUS.SHIPPED);
        }

        if (option === OPTION_PAGE.ACCOMPLISHED) {
            statuses = getOrderStatusesByTwoStatus(listOrderStatus, ORDER_STATUS.DELIVERED,
                ORDER_STATUS.CANCELLED);
        }

        if (isEmptyArray(statuses)) return;
        setAllOrderStatus(sortSelect([...statuses, DEFAULT_STATUS]))

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
        ? dispatch(defaultSearchStatusChange()) : dispatch(searchStatusChange(option))

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

export default SearchDeliveryOrderStatus;
