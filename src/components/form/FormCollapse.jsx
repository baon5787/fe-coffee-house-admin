import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const FormCollapse = ({ title, children }) => {

  const [isShow, setIsShow] = useState(true);

  return (
    <>
      <div
        className={`fw-bolder fs-3 rotate collapsible mb-7 ${isShow ? 'active' : 'collapsed'}`}
        onClick={() => setIsShow(!isShow)}
      >
        {title}
        <span className='ms-2 rotate-180'>
          <FontAwesomeIcon icon={faAngleDown} />
        </span>
      </div>
      <div className={`collapse ${isShow ? 'show' : ''}`}>
        {children}
      </div>
    </>
  )
}

FormCollapse.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}

export default FormCollapse
