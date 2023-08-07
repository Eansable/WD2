import api from "./api"
import { usersReducer } from "./reducer"
import  {defActionSlice} from "../../../../helpers/defaultAction"

const { 
 getAllSuccess,
 setError,
 setLoading
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