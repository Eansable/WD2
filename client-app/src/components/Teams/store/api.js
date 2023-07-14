import { requests } from "../../../settings/axios";

const api = {
  getAll: (params) => requests.get("Team/GetAll", params),
  add: (params) => requests.post("Team/Add", params),
  edit: (params) => requests.post("Team/update", params),
  delete: (params) => requests.post("Team/delete", params),
  restore: (params) => requests.post("Team/restore", params),
  getOneTeam: (params) => requests.get("Team/getOneTeam", params),
};

export default api;
