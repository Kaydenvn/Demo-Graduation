import { useLocation, Navigate, Outlet } from "react-router-dom";
import { showNotification } from "src/components/Notification/Notification";

import useAuth from "src/hooks/useAuth";

const showErrorMessage = () => {
  showNotification("error", "You must be logged in to view this page");
};

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from.pathname;

  return isAuthenticated ? (
    <Outlet />
  ) : from ? (
    (showErrorMessage(),
    (<Navigate to="/login" state={{ from: location }} replace />))
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
