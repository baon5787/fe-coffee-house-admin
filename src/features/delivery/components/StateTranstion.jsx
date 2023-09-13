import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const StateTranstion = ({ index, state, statusEnd, statusName }) => {
    const getCurrentItemState = () => {
        const currentItem = state?.status === statusName ? 'current-item' : '';
        const complete = statusEnd === statusName ? 'complete' : '';
        return `${currentItem} ${complete}`
    }
    return (
        <div
            className={`stepper-item me-5 ${getCurrentItemState()}`}
        >
            <div className="stepper-wrapper d-flex align-items-center">
                <div className="stepper-icon">
                    <span className='svg-icon svg-icon-2x svg-icon-info'>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className='stepper-number'>{index + 1}</span>
                </div>
                <div className='stepper-label'>
                    <h3 className='stepper-title'>
                        {
                            state?.stateName
                        }
                    </h3>
                </div>
            </div>
            {
                state?.status !== statusEnd && (
                    <div className='stepper-line h-40px'></div>
                )
            }
        </div>
    )
}

export default StateTranstion;
