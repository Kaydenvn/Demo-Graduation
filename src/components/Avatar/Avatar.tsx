import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "src/assets/avatar-trang-4.jpg";
import useAuth from "src/hooks/useAuth";
import http from "src/utils/http";

export default function Avatar() {
  const { setIsAuthenticated, setUser, role, user, setRole } = useAuth();

  const getUserById = async (id: string) => {
    try {
      const response = await http.get(`/api/users/${id}`);
      const user = response.data;
      setUser(user);
      setRole(user.role);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  if (user?.id) {
    // const userQuery = useQuery({
    //   queryKey: ["user", user?.id],
    //   queryFn: () => getUserById(user.id),
    // });
    // const userQueryData = userQuery.data;
    // console.log(userQueryData);
    // useEffect(() => {
    //   if (userQueryData) {
    //     setUser(userQueryData);
    //     setRole(userQueryData.role);
    //   }
    // }, [user.id]);
  }

  const navigate = useNavigate();
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser({
      email: "",
      id: "",
      name: "",
      role: "",
      status: "",
      avatar: "",
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
