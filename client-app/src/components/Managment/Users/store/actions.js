import api from "./api"
import { usersReducer } from "./reducer"
import  {defActionSlice} from "../../../../helpers/defaultAction"

const { 
 getAllSuccess,
 setError,
 setLoading,
 getByIdSuccess
} = usersReducer.actions

export const getAllAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: getAllSuccess,
        service: {
            func: api.getAll,
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