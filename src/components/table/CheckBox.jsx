import React from 'react'
import PropTypes from 'prop-types';

const CheckBox = (props) => {
    const { value, onChange, checked } = props;
    return (
        <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
            <input type="checkbox" className='form-check-input'
                value={value}
                onChange={onChange}
                checked={checked}
            />
        </div>
    )
}

CheckBox.propTypes = {
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
}

export default CheckBox;
