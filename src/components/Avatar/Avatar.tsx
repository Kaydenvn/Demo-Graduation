import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "src/assets/avatar-trang-4.jpg";
import useAuth from "src/hooks/useAuth";

export default function Avatar() {
  const { setIsAuthenticated, setUser, role } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser({
      email: "",
      password: "",
    });
    navigate("/login");
  };

  return (
    <details className="dropdown dropdown-end">
      <summary className="m-1 btn bg-transparent border-none hover:bg-transparent">
        <div className="avatar">
          <div className="w-11 rounded-full">
            <img src={defaultAvatar} />
          </div>
        </div>
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36">
        <li>
          <a>Profile</a>
        </li>
        {role === "admin" && (
          <li>
            <Link to="/dashboard">Admin</Link>
          </li>
        )}
        <li>
          <button onClick={handleSignOut} className="text-red-500">
            Logout
          </button>
        </li>
      </ul>
    </details>
  );
}
