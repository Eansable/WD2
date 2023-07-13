import { requests } from "../../../../settings/axios"

const api = {
    getAll: (values) => requests.get("/stadiums/getAll", values), 
    add: (values) => requests.post("/stadiums/add", values) 
}

export default api