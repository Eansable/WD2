import { createSlice } from "@reduxjs/toolkit";
import { formInt } from "../types"

export interface PositionState {
    isSending: boolean,
    error: any,
    positionsList: null | formInt,
    changed: string
}

const initialState = {
    isSending: false,
        error: null,
        positionsList: null,
        changed: ''
}

export const PositionSlicer = createSlice({
    name: "positionReducer",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isSending = true
            state.changed = ''
        },
        setError: (state, action) => {
            state.isSending = false
            state.error = action.payload
        },
        getAll: (state, action) => {
            state.isSending = false
            state.positionsList = action.payload
        },
        add: (state, action) => {
            state.changed = action.payload ? 'Позиция успешно добавлена' : ''
        },

    }
})

export default PositionSlicer.reducer