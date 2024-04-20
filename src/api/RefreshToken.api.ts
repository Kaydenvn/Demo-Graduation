import http from "src/utils/http";

const useRefreshTokeToGetAccessToken = async () => {
  const response = await http.post("/api/refresh-token", {
    withCredentials: true,
  });
  return response.data;
};

export { useRefreshTokeToGetAccessToken };
