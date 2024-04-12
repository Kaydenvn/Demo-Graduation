import Logo from "src/assets/logo_FTE_mainpage_2.png";
import { Link, NavLink } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Avatar from "../Avatar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderDashboard() {
  const naviate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated == false) {
      naviate("/login");
    }
  });

  return (
    <header className="navbar bg-primary sticky top-0 z-50 rounded-b">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <Link to="/" className="hover:opacity-80">
          <img
            src={Logo}
            alt="Logo"
            className="hidden md:inline-block md:w-[15rem] absolute top-0.5 left-2"
          />
        </Link>
      </div>
      <div className="navbar-end">
        {isAuthenticated == true ? (
          <Avatar />
        ) : (
          <NavLink to="/login" className="btn">
            Đăng Nhập
          </NavLink>
        )}
      </div>
    </header>
  );
}
