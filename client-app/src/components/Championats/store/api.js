import { requests } from "../../../settings/axios";

const api = {
  getAll: (values) => requests.get("championat/getAll", values),
  getAllActive: (values) => requests.post("championat/Add", values),
};

export default api;
