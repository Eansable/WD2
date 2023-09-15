import { requests } from "../../../settings/axios"

const api = {
    getByTeamId: (params) => requests.get('/player/getByTeamId', params),
    getById: (params) => requests.get('/player/getById', params),
    add: (params) => requests.post('/player/add', params),
    change: (params) => requests.post('/player/change', params),
    
}

export default api