import { apiInstance } from "../../api/api.js";

export const setAuthHeader = token => {
  apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
