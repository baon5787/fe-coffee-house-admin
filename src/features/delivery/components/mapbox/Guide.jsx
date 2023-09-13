import React from 'react'
import { coverDistanceAboutKm, coverDurationAboutTime } from '~/utils/HandleValue';
import PropTypes from 'prop-types';

const Guide = (props) => {
    const {
        instruction, location, icon, distance, duration,
        onClickPoint, onMouseMovePoint, onMouseOutPoint
    } = props;
    const distanceKm = coverDistanceAboutKm(distance);

    const durationTime = coverDurationAboutTime(duration);

    return (
        <>
            <div className='timeline-icon symbol symbol-circle symbol-40px me-4' >
                <div className='symbol-label bg-light'>
                    <span className='svg-icon svg-icon-2 svg-icon-danger'>
                        {icon}
                    </span>
                </div>
            </div>
            <div className="timeline-content mb-10 mt-n1 w-150px">
                <div className="pe-3 mb-5">
                    {
                        location ? (
                            <>
                                <div className="fs-5 fw-semibold mb-2"
                                    onClick={onClickPoint}
                                    onMouseMove={onMouseMovePoint}
                                    onMouseOut={onMouseOutPoint}
                                >
                                    {location}
                                </div>
                                <div className="d-flex align-items-center mt-1 fs-6">
                                    <div className="text-muted me-2 fs-7">{instruction}</div>
                                </div>
                                {
                                    distanceKm > 0 && (
                                        <>
                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">
                                                    Quảng đường: {distanceKm} Km
                                                    Thời gian : {durationTime}
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <div className="fs-5 fw-semibold mb-2 mt-4"
                                    onClick={onClickPoint}
                                    onMouseMove={onMouseMovePoint}
                                    onMouseOut={onMouseOutPoint}
                                >
                                    {instruction}
                                </div>
                                {
                                    distanceKm > 0 && (
                                        <>
                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">
                                                    Quảng đường: {distanceKm} Km.
                                                    Thời gian : {durationTime}
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

Guide.propTypes = {
    instruction: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    icon: PropTypes.element.isRequired,
    location: PropTypes.string
}

export default Guide;
