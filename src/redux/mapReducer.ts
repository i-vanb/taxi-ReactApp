import {ERROR_ADDRESS_TOGGLE, SET_ADDRESS, SET_POSITION, SET_SUGGESTIONS, TOGGLE_IS_REVERSE} from "./types";

const initialState = {
    address: {
        city: 'Ижевск',
        street: '',
        houseNumber: '',
        error: {
            status: false,
            text: ''
        },
        subtitle: 'Введите адрес',
    },
    position: {
        "lat": 56.85271,
        "lon": 53.21146
    },
    settings: {
        zoom: 12,
        isReverseGeocode: false
    },
    suggestions: []
}

export const mapReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SET_POSITION:
            return {...state, position: action.payload }
        case ERROR_ADDRESS_TOGGLE:
            let payload = {
                status: !!action.payload,
                text: action.payload
            }
            return {...state, address: {...state.address, error: payload}}
        case SET_ADDRESS:
            return {...state, address: {...state.address, street: action.payload.street, houseNumber: action.payload.house}}
        case TOGGLE_IS_REVERSE:
            return {...state, settings: {...state.settings, isReverseGeocode: action.payload}}
        case SET_SUGGESTIONS:
            return {...state, suggestions: action.payload}
        default: return state
    }
}

