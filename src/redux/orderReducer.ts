import {SET_ORDER} from "./types";

const initialState:any = []

export const orderReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SET_ORDER:
            return [...state, action.payload]
     default: return state
    }
}
