import axios from "axios";
import { refreshAccessToken } from "../redux/auth/operationLogin";
import { notifyOnlogginError } from "../helpers/hot-toasts.js";

const apiInstance = axios.create({
  baseURL: "https://innov8ors-backend.onrender.com",
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  config => {
    const persistedData = localStorage.getItem("persist:auth-token");
    if (persistedData) {
      const parsedData = JSON.parse(persistedData);
      const accessToken = parsedData?.accessToken;

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

const setupAxiosInterceptors = store => {
  apiInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await store
            .dispatch(refreshAccessToken())
            .unwrap();

          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return apiInstance(originalRequest);
        } catch (refreshError) {
          notifyOnlogginError("Session expired. Please log in again");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export { apiInstance, setupAxiosInterceptors };
