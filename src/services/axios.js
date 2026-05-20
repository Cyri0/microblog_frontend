import axios from "axios";
import { getCookie } from "./helper";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

export default api;