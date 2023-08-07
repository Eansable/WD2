import { requests } from "../../../../settings/axios"

const api = {
    getAll: (params) => requests.get("/managment/getAll", params)
}

export default api