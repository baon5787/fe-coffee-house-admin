import React, { useEffect, useState } from 'react'
import FlatpickrRange from '../flatpickr/FlatpickrRange';
import { useDispatch, useSelector } from 'react-redux';
import { defaultSearchDateRangeChange, searchDateRangeChange } from '~/redux/slice/FiltersSlice';
import { searchTimeEndedSelector, searchTimeStartSelector } from '~/redux/selectors';
import { RemoveIcon } from '../icons/Icons';

const SearchDateRange = () => {

    const [value, setValue] = useState();

    const timeStart = useSelector(searchTimeStartSelector);
    const timeEnded = useSelector(searchTimeEndedSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (timeStart && timeEnded) {
            setValue([new Date(timeStart), new Date(timeEnded)]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDateRange = (date) => {
        if (date?.length > 1) {
            setValue(date)
            dispatch(searchDateRangeChange({
                time_start: date[0].toString(),
                time_ended: date[1].toString(),
            }))
        }
    }

    const removeDateRange = () => {
        setValue();
        dispatch(defaultSearchDateRangeChange())
    }

    return (
        <>
            <div className='input-group w-250px'>
                <FlatpickrRange
                    value={value}
                    options={{
                        mode: 'range',
                        dateFormat: 'd-m-Y',
                    }}
                    placeholder={'Pick date range'}
                    onChange={(dateRange) => handleDateRange(dateRange)}
                />
                <button className='btn btn-icon btn-light'
                    onClick={removeDateRange}
                >
                    <span className='svg-icon svg-icon-2'>
                        <RemoveIcon size={24} />
                    </span>
                </button>
            </div>
        </>
    )
}

export default SearchDateRange;
