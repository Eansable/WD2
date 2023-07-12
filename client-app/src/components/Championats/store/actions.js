import api from "./api";
import { defActionSlice } from "../../../helpers/defaultAction";
import { championatReducer } from "./reducer"

const {
    setLoading,
    setError,
    getAllSuccess,
    addSuccess,
    addTeamSuccess
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

export const addAction = (params) => {
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

export const addTeamAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: addTeamSuccess,
        service: {
            func: api.addTeam,
            params
        }
    }
    return defActionSlice(defActionObj)
}
