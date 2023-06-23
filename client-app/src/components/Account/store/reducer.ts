import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    registred: '',
    user: null
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
        },
    }
})

export default accountReducer.reducer