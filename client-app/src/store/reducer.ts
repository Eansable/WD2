import { combineReducers } from "@reduxjs/toolkit";
import PositionReducer from "../components/NRI/Positions/store/reducer";
import accountReducer from "../components/Account/store/reducer";
import teamReducer from "../components/Teams/store/reducer";
import championatReducer from "../components/Championats/store/reducer";
import PlayersReducer from "../components/Players/store/reducer";
import stadiumReducer from "@/components/NRI/Stadiums/store/reducer";
import eventReducer from "@/components/NRI/Events/store/reducer";
import matchesReducer from "@/components/Matches/store/reducer";

export default combineReducers({
    PositionReducer,
    accountReducer,
    teamReducer,
    championatReducer,
    PlayersReducer,
    stadiumReducer,
    matchesReducer,
    eventReducer
})