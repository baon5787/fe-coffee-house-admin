import React, { useEffect, useRef, useState } from 'react'
import { Layer, Map, NavigationControl, Popup, Source } from 'react-map-gl';
import { DEFAULT_INDEX, THE_COFFEE_HOUSE } from '~/constants/AppConstant';
import { getSourceLine, getSourcePoint, getSourcePointStartAndEnd } from '~/utils/HandleValue';
import MapImage from './MapImage';
import Directional from './Directional';
import { getCoordinatesCustomer, getLine } from '~/features/delivery/services/DeliveryOrderApi';
import axios from 'axios';
import { ERROR } from '~/constants/Paths';
import { isEmptyArray } from '~/utils/CheckValue';

const mapToken = process.env.REACT_APP_MAP_TOKEN;

const MapBox = ({ address, customerName }) => {

    const mapRef = useRef();

    const [geoLine, setGeoLine] = useState([]);

    const [geoPoint, setGeoPoint] = useState([]);

    const [guide, setGuide] = useState([]);

    const [showPopup, setShowPopup] = useState(false);

    const [popup, setPopup] = useState([]);

    const [filterPoint, setFilterPoint] = useState();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const loadMap = async () => {

            if (!address) return;

            const coordinates = await getCoordinatesCustomer(address, mapToken, cancelToken);

            if (coordinates === ERROR) return;

            const data = await getLine(coordinates, THE_COFFEE_HOUSE, cancelToken, mapToken);

            if (data === ERROR) return;
            setGeoPoint(getSourcePointStartAndEnd(coordinates, customerName));
            setGuide(data);
            setGeoLine(getSourceLine(data?.coordinates));
        }
        loadMap();
        return () => {
            cancelToken.cancel('Operation canceled by the map.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = (e) => {
        const data = mapRef.current.queryRenderedFeatures(e.point, {
            layers: ['image-point']
        });

        if (isEmptyArray(data)) return;

        const lnglnt = data[DEFAULT_INDEX]?.properties?.lnglnt?.split(',');
        if (lnglnt.length === 2) {
            setPopup({
                longitude: lnglnt[0],
                latitude: lnglnt[1],
                title: data[DEFAULT_INDEX]?.properties?.name
            });
            setShowPopup(true);
            mapRef?.current?.flyTo(
                {
                    center: [lnglnt[0], lnglnt[1]],
                    zoom: 15,
                    speed: 1.5,
                }
            )
        }
    }

    const handleClickPoint = (longitude, latitude) => {
        mapRef?.current?.flyTo(
            {
                center: [longitude, latitude],
                zoom: 18,
                speed: 1.2,
            }
        )
    }

    const handleClosePopup = () => {
        setShowPopup(false)
        setPopup([])
    }

    const handleMouseMove = (longitude, latitude) => {
        if (!filterPoint) {
            setFilterPoint(getSourcePoint(longitude, latitude))
        }
    }

    const handleMouseOutPoint = () => {
        setFilterPoint();
    }

    if (isEmptyArray(geoPoint) || isEmptyArray(geoLine)) return;

    return (
        <div className='w-md-100 mb-4 h-400px'>
            <Map
                mapboxAccessToken={mapToken}
                initialViewState={{
                    longitude: THE_COFFEE_HOUSE.longitude,
                    latitude: THE_COFFEE_HOUSE.latitude,
                    zoom: 12
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                ref={mapRef}
                onClick={(e) => handleClick(e)}
            >
                <MapImage />
                <NavigationControl showZoom position='top-right' />
                {
                    geoPoint && (
                        <>
                            <Source id='point' type='geojson' data={geoPoint} />
                            <Layer
                                id='image-point'
                                type='symbol'
                                source='point'
                                layout={{
                                    'icon-image': ['get', 'icon'],
                                }}
                            />
                        </>
                    )
                }
                {
                    geoLine && (
                        <>
                            <Source id='directions' type='geojson' data={geoLine} />
                            <Layer
                                id='directions-layer'
                                type='line'
                                source='directions'
                                layout={{
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                }}
                                paint={{
                                    'line-color': '#3887be',
                                    'line-width': 5,
                                    'line-opacity': 0.75
                                }}
                            />
                        </>
                    )
                }
                {
                    showPopup && (
                        <Popup
                            latitude={popup?.latitude}
                            longitude={popup?.longitude}
                            onClose={() => handleClosePopup()}
                            anchor='left'
                            closeOnClick={false}
                        >
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <div className='symbol symbol-100px symbol-circle symbol-lg-160px symbol-fixed position-relative mb-6'>

                                    </div>
                                    <h4 className='text-gray-900 text-hover-primary fs-2 fw-bold me-1 mb-6'>{popup?.title}</h4>
                                </div>
                            </div>
                        </Popup>
                    )
                }
                {
                    filterPoint && (
                        <>
                            <Source id='filter-point' type='geojson' data={filterPoint} />
                            <Layer
                                id='filter'
                                type='circle'
                                source='filter-point'
                                paint={{
                                    'circle-radius': 5,
                                    'circle-color': '#3887be'
                                }}
                            />
                        </>
                    )
                }
            </Map>
            <Directional
                guide={guide}
                onClickPoint={handleClickPoint}
                onMouseMovePoint={handleMouseMove}
                onMouseOutPoint={handleMouseOutPoint}
            />
        </div>
    )
}

export default MapBox;
