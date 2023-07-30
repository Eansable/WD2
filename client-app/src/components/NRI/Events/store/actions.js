import api from "./api"
import { eventReducer } from "./reducer"
import { defActionSlice } from "../../../../helpers/defaultAction"

const {
    addSuccess,
    getAllSuccess,
    setError,
    setLoading
} = eventReducer.actions

export const getAllAction = (params) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: getAllSuccess,
        service: {
            func: api.getAll,
            params
        }
    }
    return defActionSlice(defObj)
}

export const addAction = (params) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: addSuccess,
        service: {
            func: api.add,
            params
        }
    }
    return defActionSlice(defObj)
}