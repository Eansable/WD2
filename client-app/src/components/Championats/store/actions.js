import api from "./api";
import { defActionSlice } from "../../../helpers/defaultAction";
import { championatReducer } from "./reducer"

const {
    setLoading,
    setError,
    getAllSuccess,
    addSuccess,
    addTeamSuccess,
    getOneByIdSuccess,
    deleteTeamSuccess,
    addMatchSuccess,
    deleteSuccess,
    getDefaultSuccess,
    setDefaultLoading
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

export const getDefaultAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: getDefaultSuccess,
        service: {
            func: api.getDefault,
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

export const deleteAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: deleteSuccess,
        service: {
            func: api.delete,
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

export const addMatchAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: addMatchSuccess,
        service: {
            func: api.addMatch,
            params
        }
    }
    return defActionSlice(defActionObj)
}

export const deleteTeamAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: deleteTeamSuccess,
        service: {
            func: api.deleteTeam,
            params
        }
    }
    return defActionSlice(defActionObj)
}

export const getOneByIdAction = (params) => {
    const defActionObj = { 
        req: setLoading,
        fail: setError,
        suc: getOneByIdSuccess,
        service: {
            func: api.getOneById,
            params
        }
    }
    return defActionSlice(defActionObj)
}
