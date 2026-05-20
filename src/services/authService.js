import api from "./axios";

export const getCsrfToken = async () => {
  const response = await api.get("/auth/csrf/");
  return response.data;
};