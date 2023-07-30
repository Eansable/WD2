import api from "./api";
import { matchesReducer } from "./reducer"
import {defActionSlice} from "../../../helpers/defaultAction"

const {
    getMatchesByChampIdSuccess,
    setError,
    setLoading,
    getByIdSuccess
} = matchesReducer.actions

export const getMatchesByChampIdAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: getMatchesByChampIdSuccess,
        service: {
            func: api.getMatchesByChampId,
            params: values
        }
    }
    return defActionSlice(defObj)
}

export const getByIdAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: getByIdSuccess,
        service: {
            func: api.getById,
            params: values
        }
    }
    return defActionSlice(defObj)
}