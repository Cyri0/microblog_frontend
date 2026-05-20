import api from "./axios";

export const getCsrfToken = async () => {
  const response = await api.get("/auth/csrf/");
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login/", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me/");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout/");
  return response.data;
};