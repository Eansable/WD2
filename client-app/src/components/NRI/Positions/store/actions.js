import { defActionSlice } from "../../../../helpers/defaultAction"
import api from "./api"
import { PositionSlicer } from "./reducer"

const {
    setLoading,
    getAll,
    setError,
    add,
} = PositionSlicer.actions

export const getAllAction = () => {
    const defaultObj = {
        req: setLoading,
        fail: setError,
        suc: getAll,
        reqParams: null,
        service: {
            func: api.getAll
        }
    }
    return defActionSlice(defaultObj)
}

export const addAction = (values) => {
    const defaultObj = {
        req: setLoading,
        fail: setError,
        reqParams: null,
        suc: add,
        service: {
            func: api.add,
            params: values
        }
    }
    return defActionSlice(defaultObj)
}

export default {
    addAction
}