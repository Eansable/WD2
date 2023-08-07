import { createSlice } from "@reduxjs/toolkit"
import { UserType } from "../../types"

interface initialStateType {
    isLoading: boolean,
    users?: UserType[]
}

const initialState: initialStateType = {
    isLoading: false,
    users: undefined
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
        }
    }
})

export default usersReducer.reducer