import { createSlice } from "@reduxjs/toolkit";
import { OneTeamType, TeamInterface } from "../types";

interface initialStateInterface {
  isLoading: boolean;
  teams: TeamInterface[];
  changed?: string;
  oneTeam?: OneTeamType;
}

const initialState: initialStateInterface = {
  isLoading: false,
  teams: [],
  changed: undefined,
  oneTeam: undefined,
};

export const TeamReducer = createSlice({
  name: "TeamReaducer",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.changed = undefined;
    },
    setError: (state) => {
      state.isLoading = false;
    },
    getAllSuccess: (state, action) => {
      state.isLoading = false;
      state.teams = action.payload;
    },
    addSuccess: (state, action) => {
      state.isLoading = false;
      state.changed = action.payload ? "Команда добавлена" : "";
    },
    editSuccess: (state, action) => {
      state.isLoading = false;
      state.changed = action.payload ? "Команда успешно отредоктирована" : "";
    },
    deleteSuccess: (state, action) => {
      state.isLoading = false;
      state.changed = action.payload ? "Команда успешно удалена" : "";
    },
    restoreSuccess: (state, action) => {
      state.isLoading = false;
      state.changed = action.payload ? "Команда успешно восстановлена" : "";
    },
    getOneTeamSuccess: (state, action) => {
      state.isLoading = false;
      state.oneTeam = action.payload;
    },
  },
});

export default TeamReducer.reducer;
