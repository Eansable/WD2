import { createSlice } from "@reduxjs/toolkit";
import { userInterface, stateInterface } from "../types/types";

const initialState: {
    isLoading: boolean,
    registred: string,
    user: userInterface,
    roles: string[]
    isError: boolean
} = {
    isLoading: false,
    registred: '',
    user: {},
    roles: [],
    isError: false
}

export const accountReducer = createSlice({
    name: 'accountReducer',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
            state.isError = false
        },
        setError: (state, action) => {
            state.isLoading = false
            state.isError = true
            console.log(action);
            
        },
        registerSuccess: (state, action) => {
            state.isLoading = false
            state.registred = action.payload ? 'Пользователь успешно зарегистрирован' : ''
        },
        loginSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.roles = action.payload.roles
            window.localStorage.setItem("user", JSON.stringify({
                userName: action.payload.userName,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                sessionId: action.payload.sessionId
            }))
        },
        refreshSuccess: (state, action) => {
            state.isLoading = false
        },
        refreshUserDataSuccess: (state, action) => {
            state.isLoading = false,
                state.user = action.payload
            state.roles = action.payload.roles
        },
        clearError: (state) => {
            state.isError = false
        }
    }
})

export default accountReducer.reducer