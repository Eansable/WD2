import { defActionSlice } from "../../../helpers/defaultAction"
import api from "./api"
import { PlayersReducer } from "./reducer"

const { addSuccess,
    getByTeamIdSuccess,
    setError,
    setLoading,
    getByIdSuccess,
    changeSuccess,
    changeAvatarSuccess
} = PlayersReducer.actions

export const getByTeamIdAction = (params) => {
    const defAction = {
        req: setLoading,
        fail: setError,
        suc: getByTeamIdSuccess,
        service: {
            func: api.getByTeamId,
            params: params
        }
    }
    return defActionSlice(defAction)
}

export const getByIdAction = (params) => {
    const defAction = {
        req: setLoading,
        fail: setError,
        suc: getByIdSuccess,
        service: {
            func: api.getById,
            params: params
        }
    }
    return defActionSlice(defAction)
}

export const addAction = (params) => {
    const defAction = {
        req: setLoading,
        fail: setError,
        suc: addSuccess,
        service: {
            func: api.add,
            params
        }
    }
    return defActionSlice(defAction)
}

export const changeAction = (params) => {
    const defAction = {
        req: setLoading,
        fail: setError,
        suc: changeSuccess,
        service: {
            func: api.change,
            params
        }
    }
    return defActionSlice(defAction)
}

export const changeAvatatAction = (params) => {
    const defAction = {
        req: setLoading,
        fail: setError,
        suc: changeAvatarSuccess,
        service: {
            func: api.changeAvatar,
            params
        }
    }
    return defActionSlice(defAction)
}
