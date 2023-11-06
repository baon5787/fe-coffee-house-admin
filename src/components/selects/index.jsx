import React from 'react'
import Select from 'react-select';

const Selects = ({ classContainer, ...selectProps }) => {

    return (
        <>
            <Select
                {...selectProps}
                classNames={{
                    control: (state) => {
                        return [
                            state.isFocused
                                ? 'select2-control select2-control__focused'
                                : 'select2-control'
                        ]
                    },
                    singleValue: () => 'select2-control__value',
                    dropdownIndicator: () => 'select2-arrow',
                    menu: () => 'select2-menu',
                    option: (state) => {
                        return [
                            state.isSelected
                                ? 'select2-option__selected'
                                : state.isFocused
                                    ? 'select2-option__focused'
                                    : 'select2-option'
                        ]
                    },
                    valueContainer: () => `select2-value ${classContainer ? classContainer : ''}`,
                    placeholder: () => '!truncate'
                }}
                menuPortalTarget={document.body}
                styles={{
                    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
                    menuPortal: base => ({ ...base, zIndex: 1056 }),

                }}
                isSearchable={false}
            />
        </>
    )
}

export default Selects;