import React from 'react'
import Selects from '../select';
import PropTypes from 'prop-types';
import { isEmptyArray } from '~/utils/CheckValue';

const Selections = ({ options = [], name, value, setValue }) => {

    if (isEmptyArray(options)) return;

    const defaultValue = options?.filter(option => option?.value === value);

    const handleChangeOption = (option) => {
        setValue(name, option?.value, {
            shouldValidate: true,
            shouldTouch: true
        })
    }

    return (
        <>
            <Selects
                name={name}
                options={options}
                defaultValue={defaultValue}
                onChange={(option) => {
                    handleChangeOption(option)
                }}
            />
        </>
    )
}

Selections.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default Selections;
