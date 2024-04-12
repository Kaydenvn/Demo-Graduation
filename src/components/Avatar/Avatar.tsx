import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "src/assets/avatar-trang-4.jpg";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type AuthState = {
  name: string;
  role: string;
  uid: string;
  email: string;
};

export default function Avatar() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };
  const auth = useAuthUser<AuthState>();

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
        {auth?.role === "admin" && (
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
