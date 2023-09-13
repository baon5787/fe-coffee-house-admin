import React from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.css';
import PropTypes from 'prop-types';

const FlatpickrDate = ({ value, options, ...faltpickrProps }) => {
    return (
        <>
            <Flatpickr
                className='form-control'
                value={value}
                options={options}
                {...faltpickrProps}
            />
        </>
    )
}

FlatpickrDate.propTypes = {
    value: PropTypes.instanceOf(Date),
    options: PropTypes.object.isRequired,
}

export default FlatpickrDate
