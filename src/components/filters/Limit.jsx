import React, { memo } from 'react'
import PropTypes from 'prop-types';
import Selects from '../selects';
import { useDispatch } from 'react-redux';
import { limitFilterChange } from '~/redux/slice/FiltersSlice';
import { MIN_LENGTH } from '~/constants/AppConstant';

const Limit = ({ value, options, totalPage }) => {

    const dispatch = useDispatch();

    const handleLimitChange = (newLimit) => {

        dispatch(limitFilterChange({
            newLimit: newLimit,
            totalPage: totalPage,
        }));
    }

    const defaultValue = options?.filter(option => option?.value === value);

    if (!defaultValue || defaultValue?.length === MIN_LENGTH) return;

    return (
        <Selects
            classContainer={'!p-[0.775rem_1rem]'}
            options={options}
            defaultValue={defaultValue}
            onChange={(option) => {
                handleLimitChange(option.value);
            }}
        />
    )
}

Limit.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    totalPage: PropTypes.number,
}

export default memo(Limit)