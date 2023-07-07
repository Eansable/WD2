import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
    isLoading: boolean,
    teams: TeamInterface[],
    changed?: string
}

const initialState:initialStateInterface = {
    isLoading: false,
    teams: [],
    changed: undefined
}

export const TeamReducer = createSlice({
    name: "TeamReaducer",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
            state.changed = undefined
        },
        setError: (state) => {
            state.isLoading = false
        },
        getAllSuccess: (state, action) => {
            state.isLoading = false
            state.teams = action.payload
        },
        addSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Команда добавлена" : ''
        }
    }
})

export default TeamReducer.reducer
