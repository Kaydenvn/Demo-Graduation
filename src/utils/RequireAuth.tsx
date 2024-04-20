import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { showNotification } from "src/components/Notification/Notification";

import useAuth from "src/hooks/useAuth";
import useRefreshToken from "src/hooks/useRefreshToken";

const showErrorMessage = () => {
  showNotification("You must be logged in to view this page", "warning");
};

const RequireAuth = () => {
  const { token } = useAuth();
  const refresh = useRefreshToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    useEffect(() => {
      refresh();
    }, [location.pathname]);
    return <Outlet />;
  }
};

export default RequireAuth;
