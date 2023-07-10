import { createSlice } from "@reduxjs/toolkit";
import { ChampionatType } from "../types";

interface InitialStateTypes {
  isLoading: boolean,
  error?: any,
  championats?: ChampionatType[],
  changed?: string
}

const initialState: InitialStateTypes = {
  isLoading: false,
  error: null,
  championats: undefined,
  changed: undefined
}

export const championatReducer = createSlice({
  name: "championatReducer",
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
      state.championats = action.payload
    }, 
    addSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Чемпионат успешно добавлен" : undefined
    } 
  }
})

export default championatReducer.reducer