import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "src/assets/avatar-trang-4.jpg";

export default function Avatar() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
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
        <li>
          <button onClick={handleSignOut} className="text-red-500">
            Logout
          </button>
        </li>
      </ul>
    </details>
  );
}
