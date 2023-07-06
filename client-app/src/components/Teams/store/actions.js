import api from "./api"
import { TeamReducer } from "./reducer"
import { defActionSlice } from "../../../helpers/defaultAction"
const { setLoading, getAllSuccess, setError } = TeamReducer.actions

export const getAllTeamAction = (values) => {
    const defActionObj = {
        req: setLoading,
        fail: setError,
        suc: getAllSuccess,
        service: {
            func: api.getAll,
            params: values
        }
    }
    return defActionSlice(defActionObj)
}

export const addTeamAction = (values) => {
    const defActionObj = {
        req: setLoading,
        fail: setError,
        suc: getAllSuccess,
        service: {
            func: api.add,
            params: values
        }
    }
    return defActionSlice(defActionObj)
}