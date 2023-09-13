import React from 'react'
import { CardHeader } from '~/components/card';
import { THE_COFFEE_HOUSE } from '~/constants/AppConstant';
import Guide from './Guide';
import IconDirection from './IconDirection';
import { DestinationIcon, StartIcon } from '~/components/icons/Icons';

const Directional = ({ guide, onMouseOutPoint, onClickPoint, onMouseMovePoint }) => {

    return (
        <div className="left-pane">
            <div className="card mb-5 mb-xl-8">
                <CardHeader name='Hướng dẫn đường đi' />
                <div className="card-body pt-3 w-275px scroll-y h-275px">
                    <div className="timeline">
                        {
                            guide && (
                                guide?.steps?.map((item, index) => {
                                    return (
                                        <div
                                            className="timeline-item"
                                            key={index}
                                        >
                                            <div className="timeline-line w-40px mt-6 mb-n12"></div>
                                            {
                                                index === 0 ? (
                                                    <Guide
                                                        location={THE_COFFEE_HOUSE.title}
                                                        distance={item?.distance}
                                                        duration={item?.duration}
                                                        instruction={item?.maneuver?.instruction}
                                                        icon={<StartIcon />}
                                                        onClickPoint={() => onClickPoint(item?.maneuver.location[0], item?.maneuver.location[1])}
                                                        onMouseMovePoint={() => onMouseMovePoint(item?.maneuver.location[0], item?.maneuver.location[1])}
                                                        onMouseOutPoint={() => onMouseOutPoint()}
                                                    />
                                                )
                                                    : index === (guide?.steps?.length - 1)
                                                        ? (
                                                            <Guide
                                                                location={'geoPoint?.features[0]?.properties?.name'}
                                                                distance={item?.distance}
                                                                duration={item?.duration}
                                                                instruction={item?.maneuver?.instruction}
                                                                icon={<DestinationIcon />}
                                                                onClickPoint={() => onClickPoint(item?.maneuver.location[0], item?.maneuver.location[1])}
                                                                onMouseMovePoint={() => onMouseMovePoint(item?.maneuver.location[0], item?.maneuver.location[1])}
                                                                onMouseOutPoint={() => onMouseOutPoint()}
                                                            />
                                                        ) : (
                                                            <Guide
                                                                distance={item?.distance}
                                                                duration={item?.duration}
                                                                instruction={item?.maneuver?.instruction}
                                                                icon={<IconDirection title={item?.maneuver?.instruction} />}
                                                                onClickPoint={() => onClickPoint(item?.maneuver.location[0], item?.maneuver.location[1])}
                                                                onMouseMovePoint={() => onMouseMovePoint(item?.maneuver.location[0], item?.maneuver.location[1])}
                                                                onMouseOutPoint={() => onMouseOutPoint()}
                                                            />
                                                        )
                                            }
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Directional;
