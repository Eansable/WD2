import { requests } from "../../../settings/axios"

const api = {
    getMatchesByChampId: (values) => requests.get("/matches/getMatchesByIdChamp", values),
    getById: (values) => requests.get("/matches/getById", values),
    startMatch: (values) => requests.post("/matches/startMatch", values),
    endMatch: (values) => requests.post("/matches/endMatch", values),
    addSquad: (values) => requests.post("/matches/addSquad", values),
    addGoal: (values) => requests.post("/matches/addGoal", values),
    addCard: (values) => requests.post("/matches/addCard", values),
    addSubs: (values) => requests.post("/matches/addSubs", values),
    editDate: (values) => requests.post("/matches/editDate", values),
    deleteMatch: (values) => requests.post("/matches/deleteMatch", values),
}

export default api