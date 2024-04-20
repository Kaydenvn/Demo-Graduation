import http from "src/utils/http";

const getAllUsers = async () => {
  const response = await http.get("/api/users", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export { getAllUsers };
