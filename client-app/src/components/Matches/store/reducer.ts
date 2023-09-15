import { createSlice } from "@reduxjs/toolkit";
import { MatchType } from "../types";

interface StateType {
    isLoading: boolean,
    matches?: MatchType[]
    oneMatch?: MatchType,
    changed?: string
}

const initialState: StateType = {
    isLoading: false,
    matches: undefined,
    changed: undefined
}

export const matchesReducer = createSlice({
    name: 'matchesReducer',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
            state.changed = undefined
        },
        setError: (state, action) => {
            state.isLoading = false
        },
        getMatchesByChampIdSuccess: (state, action) => {
            state.isLoading = false
            state.matches = action.payload
        },
        getByIdSuccess: (state, action) => {
            state.isLoading = false
            state.oneMatch = action.payload
        },
        startMatchSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Матч начат!" : undefined
        },
        endMatchSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Матч закончен!" : undefined
        },
        addSquadSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Стартовый состав добавлен на игру!" : undefined
        },
        addGoalSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Гол записан!" : undefined
        },
        addCardSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Карточка добавлена!" : undefined
        },
        editDateSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Время изменено!" : undefined
        },
    }
})

export default matchesReducer.reducer