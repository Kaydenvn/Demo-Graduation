import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "src/hooks/useRefreshToken";
import Loading from "../Loading";
import useAuth from "src/hooks/useAuth";

const PersistantLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistantLogin;
