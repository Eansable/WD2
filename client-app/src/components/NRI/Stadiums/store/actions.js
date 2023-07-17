import api from "./api"
import { stadiumReducer } from "./reducer"
import { defActionSlice } from "../../../../helpers/defaultAction"

const { addSuccess, getAllSuccess, setError, setLoading } = stadiumReducer.actions

export const getAllAction = (params) => {
    const Obj = {
        req: setLoading,
        fail: setError,
        suc: getAllSuccess,
        service: {
            func: api.getAll,
            params
        }
    }
    return defActionSlice(Obj)
}

export const addAction = (params) => {
    const Obj = {
        req: setLoading,
        fail: setError,
        suc: addSuccess,
        service: {
            func: api.add,
            params
        }
    }
    return defActionSlice(Obj)
} 