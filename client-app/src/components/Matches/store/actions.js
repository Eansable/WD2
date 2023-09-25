import api from "./api";
import { matchesReducer } from "./reducer"
import {defActionSlice} from "../../../helpers/defaultAction"

const {
    addGoalSuccess,
    getMatchesByChampIdSuccess,
    setError,
    setLoading,
    getByIdSuccess,
    startMatchSuccess,
    addSquadSuccess,
    endMatchSuccess,
    addCardSuccess,
    editDateSuccess,
    deleteMatchSuccess
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

export const startMatchAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: startMatchSuccess,
        service: {
            func: api.startMatch,
            params: values
        }
    }
    return defActionSlice(defObj)
}

export const endMatchAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: endMatchSuccess,
        service: {
            func: api.endMatch,
            params: values
        }
    }
    return defActionSlice(defObj)
}

export const AddSquadAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: addSquadSuccess,
        service: {
            func: api.addSquad,
            params: values
        }
    }
    return defActionSlice(defObj)
}

export const AddGoalAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: addGoalSuccess,
        service: {
            func: api.addGoal,
            params: values
        }
    }
    return defActionSlice(defObj)
}

export const AddCardAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: addCardSuccess,
        service: {
            func: api.addCard,
            params: values
        }
    }
    return defActionSlice(defObj)
}

export const editDateAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: editDateSuccess,
        service: {
            func: api.editDate,
            params: values
        }
    }
    return defActionSlice(defObj)
}

export const deleteMatcAction = (values) => {
    const defObj = {
        req: setLoading,
        fail: setError,
        suc: deleteMatchSuccess,
        service: {
            func: api.deleteMatch,
            params: values
        }
    }
    return defActionSlice(defObj)
}
