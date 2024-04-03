import http from "src/utils/http";

export const login = async (data: { email: string; password: string }) => {
  return http.post("/api/users/login", data);
};
