import { createSlice } from "@reduxjs/toolkit";

interface InitialStateTypes {
  isLoading: boolean,
  error?: any,
  championats?: string[]
}

const initialState: InitialStateTypes = {
  isLoading: false,
  error: null,
  championats: undefined
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
    } 
  }
})

export default championatReducer.reducer