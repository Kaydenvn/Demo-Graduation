import useAuth from "./useAuth";
import { useRefreshTokeToGetAccessToken } from "src/api/RefreshToken.api";

const useRefreshToken = () => {
  const { setToken, setIsAuthenticated, setUser } = useAuth();

  const data = async () => {
    try {
      const data = await useRefreshTokeToGetAccessToken();
      window.localStorage.setItem("token", data.token);

      setToken(data.token);

      setIsAuthenticated(true);

      return data.token;
    } catch (error) {
      console.error(error);
    }
  };

  return data;
};

export default useRefreshToken;
