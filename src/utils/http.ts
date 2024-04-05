import axios, { AxiosError, AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
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
