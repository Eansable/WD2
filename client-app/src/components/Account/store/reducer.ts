import { createSlice } from "@reduxjs/toolkit";
import { userInterface, stateInterface } from "../types/types";

const initialState: { isLoading: boolean, registred: string, user: userInterface, roles: string[]} = {
    isLoading: false,
    registred: '',
    user: {},
    roles: []
}

export const accountReducer = createSlice({
    name: 'accountReducer',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setError: (state) => {
            state.isLoading = false
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
        }
    }
})

export default accountReducer.reducer