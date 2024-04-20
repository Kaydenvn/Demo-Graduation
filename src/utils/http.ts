import axios, { AxiosError, AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL:
        import.meta.env.VITE_BASE_NODE_ENV === "production"
          ? import.meta.env.VITE_BASE_URL
          : import.meta.env.VITE_BASE_URL_DEV,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}

const http = new Http().instance;

export default http;
