import api from "./api";
import { TeamReducer } from "./reducer";
import { defActionSlice } from "../../../helpers/defaultAction";
const {
  setLoading,
  getAllSuccess,
  setError,
  addSuccess,
  deleteSuccess,
  editSuccess,
  restoreSuccess,
  getOneTeamSuccess,
} = TeamReducer.actions;

export const getAllTeamAction = (values) => {
  const defActionObj = {
    req: setLoading,
    fail: setError,
    suc: getAllSuccess,
    service: {
      func: api.getAll,
      params: values,
    },
  };
  return defActionSlice(defActionObj);
};

export const addTeamAction = (values) => {
  const defActionObj = {
    req: setLoading,
    fail: setError,
    suc: addSuccess,
    service: {
      func: api.add,
      params: values,
    },
  };
  return defActionSlice(defActionObj);
};

export const editTeamAction = (values) => {
  const defActionObj = {
    req: setLoading,
    fail: setError,
    suc: editSuccess,
    service: {
      func: api.edit,
      params: values,
    },
  };
  return defActionSlice(defActionObj);
};

export const deleteTeamAction = (values) => {
  const defActionObj = {
    req: setLoading,
    fail: setError,
    suc: deleteSuccess,
    service: {
      func: api.delete,
      params: values,
    },
  };
  return defActionSlice(defActionObj);
};

export const restoreTeamAction = (values) => {
  const defActionObj = {
    req: setLoading,
    fail: setError,
    suc: restoreSuccess,
    service: {
      func: api.restore,
      params: values,
    },
  };
  return defActionSlice(defActionObj);
};

export const getOneTeamAction = (values) => {
  const defActionObj = {
    req: setLoading,
    fail: setError,
    suc: getOneTeamSuccess,
    service: {
      func: api.getOneTeam,
      params: values,
    },
  };
  return defActionSlice(defActionObj);
};
