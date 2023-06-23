import { combineReducers } from "@reduxjs/toolkit";
import PositionReducer from "../components/NRI/Positions/store/reducer";
import accountReducer from "../components/Account/store/reducer";

export default combineReducers({
    PositionReducer,
    accountReducer
})