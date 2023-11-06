import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { EMPTY_ARRAY } from '~/constants/AppConstant';
import Selects from '../selects';

const Selection = (props) => {

    const {
        options = [], name, control,
        value, placeholder, noOptionsMessage
    } = props;

    const [defaultValue, setDefaultValue] = useState(EMPTY_ARRAY);

    useEffect(() => {
        setDefaultValue(options?.filter(option => option?.value === value))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, options])

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange } }) =>
                <Selects
                    options={options}
                    value={defaultValue}
                    onChange={(option) => {
                        onChange(option.value);
                        setDefaultValue(option)
                    }}
                    placeholder={placeholder}
                    noOptionsMessage={() => noOptionsMessage}
                />
            }
        />
    )
}

Selection.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    placeholder: PropTypes.string.isRequired,
    noOptionsMessage: PropTypes.string.isRequired
}

export default Selection