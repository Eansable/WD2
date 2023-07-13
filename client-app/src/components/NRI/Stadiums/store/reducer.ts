import { StadiumType } from "../types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
    isLoading: boolean,
    stadiums?: StadiumType[],
    changed?: string 
}

const initialState: InitialStateType = { 
    isLoading: false,
    stadiums: undefined,
    changed: undefined
}

export const stadiumReducer = createSlice({
    name: 'stadiumReducer',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setError: (state) => {
            state.isLoading = false
        },
        getAllSuccess: (state, action) => {
            state.isLoading = false
            state.stadiums = action.payload
        },
        addSuccess: (state, action) => {
            state.isLoading = false
            state.changed = action.payload ? "Стадион успешно добавлен" : undefined
        }
    }
})

export default stadiumReducer.reducer