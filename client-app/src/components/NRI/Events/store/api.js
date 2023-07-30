import { requests } from "../../../../settings/axios"

const api = {
    getAll: (values) => requests.get("/Event/getAll", values),
    add: (values) => requests.post("/Event/add", values),
}

export default api