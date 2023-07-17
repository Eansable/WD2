import { requests } from "../../../../settings/axios"

const api = {
    getAll: (values) => requests.get("/stadium/getAll", values), 
    add: (values) => requests.post("/stadium/add", values) 
}

export default api