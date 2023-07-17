import { createSlice } from "@reduxjs/toolkit";
import { ChampionatType } from "../types";

interface InitialStateTypes {
  isLoading: boolean,
  error?: any,
  championats?: ChampionatType[],
  changed?: string,
  oneChampionat?: ChampionatType
}

const initialState: InitialStateTypes = {
  isLoading: false,
  error: null,
  championats: undefined,
  changed: undefined,
  oneChampionat: undefined
}

export const championatReducer = createSlice({
  name: "championatReducer",
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
      state.championats = action.payload
    }, 
    addSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Чемпионат успешно добавлен!" : undefined
    }, 
    addTeamSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Команда успешно добавлена в чемпионат!" : undefined
    },
    deleteTeamSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Команда успешно удалена!" : undefined
    },
    getOneByIdSuccess: (state, action) => {
      state.isLoading = false
      state.oneChampionat = action.payload
    }, 
    addMatchSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Матч успешно добавлен в чемпионат!" : undefined
    } 
  }
})

export default championatReducer.reducer