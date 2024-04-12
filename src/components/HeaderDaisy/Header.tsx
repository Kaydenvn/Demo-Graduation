import Logo from "src/assets/logo_FTE_mainpage_2.png";
import { Link, NavLink } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Avatar from "../Avatar";

export default function Header() {
  const isAuthenticated = useIsAuthenticated();
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link
                to="/"
                className="text-primary btn bg-transparent border-none hover:text-primary"
              >
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link
                to="/introduction"
                className="text-primary btn bg-transparent border-none hover:text-primary"
              >
                Giới Thiệu
              </Link>
            </li>
            <li>
              <a className="text-primary btn bg-transparent border-none hover:text-primary">
                Tin Tức
              </a>
            </li>
            <li>
              <a className="text-primary btn bg-transparent border-none hover:text-primary">
                Liên Hệ
              </a>
            </li>
          </ul>
        </div>
        <Link to="/" className="hover:opacity-80">
          <img
            src={Logo}
            alt="Logo"
            className="hidden md:inline-block md:w-[19rem] absolute top-0.5 left-2"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link
              to="/"
              className="text-white btn bg-transparent border-none hover:text-primary"
            >
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link
              to="/introduction"
              className="text-white btn bg-transparent border-none hover:text-primary"
            >
              Giới Thiệu
            </Link>
          </li>
          <li>
            <a className="text-white btn bg-transparent border-none hover:text-primary">
              Tin Tức
            </a>
          </li>
          <li>
            <a className="text-white btn bg-transparent border-none hover:text-primary">
              Liên Hệ
            </a>
          </li>
        </ul>
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
