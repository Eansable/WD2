import { createSlice } from "@reduxjs/toolkit";
import { PlayerType } from "../types";

interface StateType {
    isLoading: boolean,
    changed?: string,
    players?: PlayerType[]
}

const initialState: StateType = {
    isLoading: false,
    players: undefined,
    changed: undefined
}

export const PlayersReducer = createSlice({
    name: "PlayersReducer",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
            state.changed = undefined
        },
        setError: (state) => {
            state.isLoading = false
        },
        getByTeamIdSuccess: (state, action) => {
            state.isLoading = false
            state.players = action.payload
        },
        addSuccess: (state, action) => {
            state.isLoading = false,
            state.changed = action.payload ? "Игрок успешно добавлен" : undefined
        }
    }
})

export default PlayersReducer.reducer