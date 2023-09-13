import React from 'react'

import PropTypes from 'prop-types'

const Errors = ({ title }) => {
    return (
        <>
            <div className='fv-plugins-message-container invalid-feedback'>
                <div>{title}</div>
            </div>
        </>
    )
}

Errors.propTypes = {
    title: PropTypes.string.isRequired
}

export default Errors;
