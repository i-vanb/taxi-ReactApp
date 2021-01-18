import React, {useState} from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {connect} from "react-redux";
import {reverseGeocoding, setPosition} from "../redux/actions";

import car from '../car.png'
import {Col, Row} from "react-bootstrap";
import {getUniqueKey} from "../utilities";
import logo from "../logo.png";


const MyMap:React.FC = (props) => {
    const [isMarked, setIsMarked] = useState<boolean>(true)
// @ts-ignore
    const {latitude, longitude, zoom, setPosition, getAddress, drivers} = props

    const driverPoints = () => {
        if (drivers?.length) {
            return (
                drivers.map((i: { car_mark: string; car_model: string; car_color: string;
                car_number: string; lat: number; lon: number; }, index:number) => {
                    let text = i.car_mark +' '+ i.car_model + ' ' + i.car_color + ' ' + i.car_number
                        return <Placemark key={getUniqueKey()} geometry={[i.lat, i.lon]}
                                   properties={{
                                       balloonContentBody: text,
                                   }}
                                   options={{
                                       preset:'islands#darkGreenDotIcon',
                                       iconColor: '#0dd238'
                                   }}
                        />
                    }
                        ))}}

    function getCoordsHandler(e: any) {
        const coords = e.get("coords")
        console.log(coords[0], coords[1])
        setIsMarked(false)
        e.get("target").panTo(coords)
        getAddress(coords[0], coords[1])
        setIsMarked(true)
    }

    return (
        <YMaps
            query={{
                ns: 'use-load-option', load:
                    'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
            }}>
            <Map width="100%"
                 state={{
                     center: [latitude, longitude],
                     zoom,
                     controls: ['zoomControl', 'fullscreenControl']
                 }}
                 onClick={getCoordsHandler}
            >{isMarked &&
            <Placemark geometry={[latitude, longitude]}
                       properties={{
                           balloonContentBody:
                               'Место подачи такси',
                       }}
                       options={{
                           iconColor: '#F7D600'
                       }}
            />}
                {drivers && driverPoints()}
            </Map>
        </YMaps>
    )
}

const mapStateToProps = (state: any) => {
    return {
        latitude: state.map.position.lat,
        longitude: state.map.position.lon,
        zoom: state.map.settings.zoom,
        drivers: state.crew
    }
}

const mapDispatchToProps = {
    setPosition,
    getAddress: reverseGeocoding
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMap)
