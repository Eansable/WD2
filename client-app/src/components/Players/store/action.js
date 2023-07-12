import { defActionSlice } from "../../../helpers/defaultAction"
import api from "./api"
import { PlayersReducer } from "./reducer"

const { addSuccess,getByTeamIdSuccess,setError,setLoading} = PlayersReducer.actions

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
