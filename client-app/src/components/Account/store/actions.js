import api from './api'
import { accountReducer } from './reducer'
import { defActionSlice } from '../../../helpers/defaultAction'

const {
    setLoading,
    registerSuccess,
    setError,
    setErrorLogin,
    loginSuccess,
    refreshSuccess,
    refreshUserDataSuccess,
    clearError
} = accountReducer.actions

export const registerAction = (values) => {
    const dispatchObj = {
        req: setLoading,
        fail: setError,
        suc: registerSuccess,
        service: {
            func: api.register,
            params: values
        }
    }
    return defActionSlice(dispatchObj)
}

export const loginAction = (values) => {
    const dispatchObj = {
        req: setLoading,
        fail: setErrorLogin,
        suc: loginSuccess,
        service: {
            func: api.login,
            params: values
        }
    }
    return defActionSlice(dispatchObj)
}

export const refreshUserDataAction = (values) => {
    const dispatchObj = {
        req: setLoading,
        fail: setError,
        suc: refreshUserDataSuccess,
        service: {
            func: api.refreshUserData,
            params: values
        }
    }
    return defActionSlice(dispatchObj)
}

export const clearErrorAction = (values) => {
    const dispatchObj = {
        req: clearError,
    }
    return defActionSlice(dispatchObj)
}
