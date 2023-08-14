import { requests } from "../../../../settings/axios"

const api = {
    getAll: (params) => requests.get("/managment/getAll", params),
    getById: (params) => requests.get("/managment/getById", params),
}

export default api