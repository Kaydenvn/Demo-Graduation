import http from "src/utils/http";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const auth = useAuthUser<{ token: string }>();

const getAllUsers = async () => {
  const response = await http.get("/api/users", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export { getAllUsers };