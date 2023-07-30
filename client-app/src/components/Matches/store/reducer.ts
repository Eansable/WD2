import { createSlice } from "@reduxjs/toolkit";
import { MatchType } from "../types";

interface StateType {
    isLoading: boolean,
    matches?: MatchType[]
    oneMatch?: MatchType
}

const initialState: StateType = {
    isLoading: false,
    matches: undefined
}

export const matchesReducer = createSlice({
    name: 'matchesReducer',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setError: (state) => {
            state.isLoading = false
        },
        getMatchesByChampIdSuccess: (state, action) => {
            state.isLoading = false
            state.matches = action.payload
        },
        getByIdSuccess: (state, action) => {
            state.isLoading = false
            state.oneMatch = action.payload
        }
    }
})

export default matchesReducer.reducer