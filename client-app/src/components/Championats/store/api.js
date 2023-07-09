import { requests } from "../../../settings/axios";

const api = {
  getAll: () => requests.get("championat/getAll"),
  getAllActive: (values) => requests.get("championat/getAllActive", values),
};

export default api;
