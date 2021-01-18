import {SET_CREW_LIST} from "./types";

const initialState:any = []

export const crewReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SET_CREW_LIST:
            return action.payload
     default: return state
    }
}

