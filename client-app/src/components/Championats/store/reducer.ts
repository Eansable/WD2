import { createSlice } from "@reduxjs/toolkit";
import ChampionatStatsType, { ChampionatType } from "../types";

interface InitialStateTypes {
  isLoading: boolean,
  isLoadingDefault: boolean
  error?: any,
  championats?: ChampionatType[],
  changed?: string,
  oneChampionat?: ChampionatType,
  deleted?: string,
  addedId?: number,
  defChampionat?: ChampionatStatsType[]
}

const initialState: InitialStateTypes = {
  isLoading: false,
  isLoadingDefault: false,
  error: null,
  championats: undefined,
  changed: undefined,
  oneChampionat: undefined,
  addedId: undefined,
  defChampionat: undefined,
  deleted: undefined
}

export const championatReducer = createSlice({
  name: "championatReducer",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
      state.changed = undefined
      state.deleted = undefined
    },
    setDefaultLoading: (state) => {
      state.isLoadingDefault = true
    },
    setError: (state) => {
      state.isLoading = false
      state.isLoadingDefault = false
    },
    getAllSuccess: (state, action) => {
      state.isLoading = false
      state.championats = action.payload
    }, 
    getDefaultSuccess: (state, action) => {
      state.isLoadingDefault = false
      state.defChampionat = action.payload
    }, 
    addSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Чемпионат успешно добавлен!" : undefined
      state.addedId = action.payload
    }, 
    deleteSuccess: (state, action) => {
      state.isLoading = false
      state.deleted = action.payload ? "Чемпионат успешно удалён!" : undefined
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
    }, 
    generateSgeduleSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Календарь успешно сформирован!" : undefined
    }, 
    changeDefaultSuccess: (state, action) => {
      state.isLoading = false
      state.changed = action.payload ? "Настройки чемпионата изменены!" : undefined
    }, 
  }
})

export default championatReducer.reducer