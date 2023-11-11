import { requests } from "../../../settings/axios";

const api = {
  getAll: (values) => requests.get("championat/getAll", values),
  getDefault: (values) => requests.get("championat/getDefault", values),
  add: (values) => requests.post("championat/Add", values),
  delete: (values) => requests.post("championat/Delete", values),
  addTeam: (values) => requests.post("championat/AddTeam", values),
  addMatch: (values) => requests.post("championat/AddMatch", values),
  deleteTeam: (values) => requests.post("championat/DeleteTeam", values),
  getOneById: (values) => requests.get("championat/GetOneById", values),
  generateShedule: (values) => requests.get("championat/GenerateShedule", values),
  changeDefault: (values) => requests.post("championat/ChangeDefault", values),
  changeLogo: (values) => requests.post("championat/ChangeLogo", values),
};

export default api;
