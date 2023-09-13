import React from 'react'

import Select from 'react-select';

import './selection.css';

const Selects = (props) => {
    return (
        <>
            <Select
                {...props}
                classNamePrefix="select2-selection"
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