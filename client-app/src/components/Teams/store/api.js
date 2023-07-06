import { requests } from "../../../settings/axios"

const api = {
    getAll: (params) => requests.get('Team/GetAll', params),
    add: (params) => requests.post('Team/Add', params)
}

export default api