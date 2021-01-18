import {combineReducers} from "redux";
import {mapReducer} from "./mapReducer";
import {crewReducer} from "./crewReducer";
import {orderReducer} from "./orderReducer";

export const rootReducer = combineReducers({
    map: mapReducer, crew: crewReducer, order: orderReducer
})
