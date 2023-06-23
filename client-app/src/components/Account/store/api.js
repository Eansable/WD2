import { requests } from "../../../settings/axios"

const api = {
    register: (values) => requests.post('/account/Register', values),
    login: (values) => requests.post('/account/login', values)
}

export default api