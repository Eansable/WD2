import { createSlice } from "@reduxjs/toolkit";
import { EventType } from "../types";

interface initialStateType {
    isLoading: boolean,
    events?: EventType[],
    changed?: string
}

const initialState: initialStateType = {
    isLoading: false,
    events: undefined,
    changed: undefined
}

export const eventReducer = createSlice({
    name: "eventReducer",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = true
            state.changed = undefined
        },
        setError: (state, action) => {
            state.isLoading = false
        },
        getAllSuccess: (state, action) => {
            state.isLoading = false
            state.events = action.payload
        },
        addSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Успешно добавлено" : undefined
        }
    }
})

export default eventReducer.reducer