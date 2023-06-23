import { requests } from "../../../../settings/axios";

 const api = {
    getAll: () => requests.get('Position/GetAll'),
    add: (params) => requests.post('Position/Add', params)
 } 

 export default api