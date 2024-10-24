import axios from "axios";

export const setAuthHeader = token => {
  apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
