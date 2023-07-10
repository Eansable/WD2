import api from "./api";
import { defActionSlice } from "../../../helpers/defaultAction";
import { championatReducer } from "./reducer"

const {
    setLoading,
    setError,
    getAllSuccess,
    addSuccess
} = championatReducer.actions

export const getAllAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: getAllSuccess,
        service: {
            func: api.getAll,
            params
        }
    }
    return defActionSlice(defActionObj)
}

export const AddAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: addSuccess,
        service: {
            func: api.add,
            params
        }
    }
    return defActionSlice(defActionObj)
}
