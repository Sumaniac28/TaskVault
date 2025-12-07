import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const REQUEST_TIMEOUT = 120000;
const RETRY_LIMIT = 3;
const RETRY_DELAY = 2000;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: REQUEST_TIMEOUT,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (!config || config.retryCount >= RETRY_LIMIT) {
      if (error.response?.status === 401 && localStorage.getItem("token")) {
        try {
          localStorage.removeItem("token");
        } catch {}
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }

    const shouldRetry =
      !error.response ||
      error.code === "ECONNABORTED" ||
      error.response?.status >= 500;

    if (shouldRetry) {
      config.retryCount = (config.retryCount || 0) + 1;
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * config.retryCount)
      );

      return axiosInstance(config);
    }

    if (error.response?.status === 401 && localStorage.getItem("token")) {
      try {
        localStorage.removeItem("token");
      } catch {}
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
