import {
    ERROR_ADDRESS_TOGGLE, SET_ADDRESS, SET_POSITION,
    TOGGLE_IS_REVERSE, SET_SUGGESTIONS, SET_CREW_LIST,
    SET_ORDER
} from "./types";

import axios from "axios";
import {crew} from "../crew";
import {dateToString, getUniqueKey} from "../utilities";

export const setPosition = (position: any) => ({
    type: SET_POSITION, payload: position
})

export const errorAddressToggle = (error: string) => ({
    type: ERROR_ADDRESS_TOGGLE, payload: error
})

export const setAddress = (street: string, house: number) => ({
    type: SET_ADDRESS, payload: {street, house}
})

export const toggleGeocode = (isReverse: boolean) => ({
    type: TOGGLE_IS_REVERSE, payload: isReverse
})

type AddressType = {
    "address": string,
    "lat": number,
    "lon": number
}

type Order = {
    "source_time": string,
    "addresses": (Array<AddressType>),
    "crew_id": number,
    "status": Status
}

type Status = {
    "code": number,
    "descr": string,
    "data": OrderId
}

type OrderId = {
    "order_id": number
}


export const setOrder = (order: Order) => ({type: SET_ORDER, payload: order})

export const prepareOrder = (crew_id: number, address: string, lat: number, lon: number) => {
    return (dispatch: any) => {
        const date = new Date(Date.now())
        const source_time = dateToString(date)
        const order_id = getUniqueKey()
        const order = {
            source_time,
            addresses: [{address, lat, lon}],
            crew_id,
            status: {
                code: 0,
                descr: 'OK',
                data: { order_id }
            }
        }
        dispatch(setOrder(order))
    }
}

export const checkAddress = (address: string) => {
    return (dispatch: any) => {
        const apiKey = 'eb2UVOdpVBrivt-CjxboTZ6eO1nPo82RpCGIOELmE8k';
        const lang = 'ru-RU';
        axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=Ижевск+${address}&lang=${lang}&apikey=${apiKey}`)
            .then(res => {
                // @ts-ignore
                const addresses = res.data.items.filter(i => i.address.city === 'Ижевск' && i.address.houseNumber)
                dispatch(setSuggestions(addresses))
            })}}

export const setSuggestions = (addresses: any) => ({type: SET_SUGGESTIONS, payload: addresses})

export const setCrewList = (list: any) => ({type: SET_CREW_LIST, payload: list})

export const getCrew = (lat: number, lon: number) => {
    return (dispatch: any) => {
        const newCrew = crew.map(i => {
            let distance = Math.sqrt(Math.pow(i.lat - lat, 2) + Math.pow(i.lon - lon, 2)) * 10000
            return {...i, distance: distance}
        })
        newCrew.sort(function (a: any, b: any) {
            if (a.distance > b.distance) {
                return 1;
            }
            if (a.distance < b.distance) {
                return -1;
            }
            return 0;
        })
        dispatch(setCrewList(newCrew))
    }
}

export const reverseGeocoding = (lat: number, lon: number) => {
    return (dispatch: any) => {
        dispatch(setPosition({lat, lon}));
        dispatch(getCrew(lat, lon))
        const apiKey = 'eb2UVOdpVBrivt-CjxboTZ6eO1nPo82RpCGIOELmE8k';
        const lang = 'ru-RU';
        axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lon}&lang=${lang}&apikey=${apiKey}`)
            .then(res => {
                const {city, street, houseNumber} = res.data.items[0].address
                if (city === "Ижевск") {
                    if (street && houseNumber) {
                        dispatch(errorAddressToggle(''))
                        dispatch(toggleGeocode(true))
                        dispatch(setAddress(street, houseNumber))
                    } else {
                        dispatch(errorAddressToggle('Адрес не найден'))
                    }
                } else {
                    dispatch(errorAddressToggle('Наше такси не работает за пределами города'))
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
}

