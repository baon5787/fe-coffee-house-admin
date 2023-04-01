import React from 'react'
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import './selection.css';

const Selection = ({ options = [], name, control, value }) => {

    const defaultValue = options.filter(option => option.value === value);

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                        defaultValue={defaultValue}
                        inputRef={ref}
                        classNamePrefix="select2-selection"
                        options={options}
                        onChange={(option) => {
                            onChange(option.value)
                        }}
                        styles={{
                            indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
                        }}
                    />
                )}
            />
        </>
    )
}

export default Selection;
