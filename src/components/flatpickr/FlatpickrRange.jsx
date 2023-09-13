import React from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.css';
import './flatpickr.css'
import PropTypes from 'prop-types';

const FlatpickrRange = ({ value, options, ...faltpickrProps }) => {
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

FlatpickrRange.propTypes = {
    value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    options: PropTypes.object.isRequired,
}

export default FlatpickrRange
