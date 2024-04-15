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
    });

    this.instance.interceptors.request.use(
      (response) => {
        return response;
      },

      async (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
