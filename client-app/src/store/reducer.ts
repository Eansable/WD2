import { combineReducers } from "@reduxjs/toolkit";
import PositionReducer from "../components/NRI/Positions/store/reducer";
import accountReducer from "../components/Account/store/reducer";
import teamReducer from "../components/Teams/store/reducer";
import championatReducer from "../components/Championats/store/reducer";

export default combineReducers({
    PositionReducer,
    accountReducer,
    teamReducer,
    championatReducer
})