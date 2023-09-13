import React from 'react'
import { DEFAULT_INDEX, END_DAY, LAST_HOURS_DAY, LAST_MINUTES_DAY, LAST_SECONDS_DAY } from '~/constants/AppConstant';
import PropTypes from 'prop-types';
import FlatpickrDate from '../flatpickr/FlatpickrDate';

const InputDate = ({ value, name, setValue, option }) => {

    const hanldeChangeDate = (value) => {
        if (setValue && option === END_DAY) {
            let dateSelect = new Date(value[DEFAULT_INDEX]);
            dateSelect.setHours(LAST_HOURS_DAY)
            dateSelect.setMinutes(LAST_MINUTES_DAY)
            dateSelect.setSeconds(LAST_SECONDS_DAY)

            setValue(name, dateSelect, {
                shouldValidate: true,
                shouldTouch: true
            });
        }

        if (setValue && option !== END_DAY) {
            setValue(name, value[DEFAULT_INDEX], {
                shouldValidate: true,
                shouldTouch: true
            });
        }
    }


    return (
        <>
            <FlatpickrDate
                value={value}
                options={{
                    dateFormat: 'd-m-Y',
                }}
                name={name}
                onChange={(dateSelect) => hanldeChangeDate(dateSelect)}
            />
        </>
    )
}

InputDate.propTypes = {
    value: PropTypes.instanceOf(Date),
    name: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    option: PropTypes.string,
}

export default InputDate
