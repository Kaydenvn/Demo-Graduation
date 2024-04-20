import http from "src/utils/http";

const getAllUsers = async () => {
  const response = await http.get("/api/users", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

const getUser = async () => {
  try {
    const response = await http.get(`/api/users/me`);
    const user = response.data;
    return user;
  } catch (error) {
    console.error(error);
  }
};

export { getAllUsers, getUser };
