import React from 'react'
import { DEFAULT_PAGINATION, MIN_LENGTH } from '~/constants/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSelector } from '~/redux/selectors';
import { limitFilterChange } from '~/redux/slice/FiltersSlice';
import Selects from '../select';
import PropTypes from 'prop-types';

const Limit = ({ value, options, totalPage }) => {

    const filters = useSelector(filtersSelector)

    const dispatch = useDispatch();

    const handleLimitChange = (newLimit) => {

        let newFilters;
        if (filters?.page * newLimit > totalPage) {
            newFilters = {
                limit: newLimit,
                page: DEFAULT_PAGINATION.PAGE,
            }
        } else {
            newFilters = {
                limit: parseInt(newLimit)
            };
        }
        dispatch(limitFilterChange(newFilters));
    }

    const defaultValue = options?.filter(option => option?.value === value);

    if (!defaultValue || defaultValue?.length === MIN_LENGTH) return;

    return (
        <>
            <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start '>
                <div className='dataTables_length'>
                    <Selects
                        options={options}
                        defaultValue={defaultValue}
                        onChange={(option) => {
                            handleLimitChange(option.value);
                        }}
                    />
                </div>
            </div>
        </>
    )
}

Limit.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    totalPage: PropTypes.number,
}

export default Limit;
