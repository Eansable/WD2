import { createSlice } from "@reduxjs/toolkit"
import { UserType } from "../../types"

interface initialStateType {
    isLoading: boolean,
    users?: UserType[],
    oneUser?: UserType
}

const initialState: initialStateType = {
    isLoading: false,
    users: undefined,
    oneUser: undefined
}

export const usersReducer = createSlice({
    name:"usersReducer",
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
            state.users = action.payload
        },
        getByIdSuccess: (state, action) => {
            state.isLoading = false
            state.oneUser = action.payload
        }
    }
})

export default usersReducer.reducer