import http from "src/utils/http";

const useRefreshTokeToGetAccessToken = async () => {
  const response = await http.post("/api/refresh", {
    withCredentials: true,
  });
  return response.data;
};

export { useRefreshTokeToGetAccessToken };
