import React from 'react'
import { useMap } from 'react-map-gl';
import start from '~/images/ecommerce/start.svg'
import end from '~/images/ecommerce/end.svg'

const MapImage = () => {
    const { current: map } = useMap();

    if (map) {
        if (!map?.hasImage('start')) {
            let startImg = new Image(20, 20)
            startImg.onload = () => map.addImage('start', startImg)
            startImg.src = start;
        }

        if (!map?.hasImage('end')) {
            let endImg = new Image(20, 20)
            endImg.onload = () => map.addImage('end', endImg)
            endImg.src = end;
        }
    }

    return (
        <></>
    );
}

export default MapImage;
