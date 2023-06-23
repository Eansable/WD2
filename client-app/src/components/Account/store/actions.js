import api from './api'
import { accountReducer } from './reducer'
import { defActionSlice } from '../../../helpers/defaultAction'

const {
    setLoading,
    registerSuccess,
    setError,
    loginSuccess
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
        fail: setError,
        suc: loginSuccess,
        service: {
            func: api.login,
            params: values
        }
    }
    return defActionSlice(dispatchObj)
}
