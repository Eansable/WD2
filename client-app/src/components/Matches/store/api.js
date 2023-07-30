import { requests } from "../../../settings/axios"

const api = {
    getMatchesByChampId: (values) => requests.get("/matches/getMatchesByIdChamp", values),
    getById: (values) => requests.get("/matches/getById", values)
}

export default api