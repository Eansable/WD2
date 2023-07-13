import { requests } from "../../../settings/axios";

const api = {
  getAll: (values) => requests.get("championat/getAll", values),
  add: (values) => requests.post("championat/Add", values),
  addTeam: (values) => requests.post("championat/AddTeam", values),
  getOneById: (values) => requests.get("championat/GetOneById", values)
};

export default api;
