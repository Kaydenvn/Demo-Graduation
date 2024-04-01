import Logo from "src/assets/logo_FTE_mainpage_2.png";

export default function Header() {
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
              <a>Trang Chủ</a>
            </li>
            <li>
              <a>Giới Thiệu</a>
            </li>
            <li>
              <a>Tin Tức</a>
            </li>
            <li>
              <a>Liên Hệ</a>
            </li>
          </ul>
        </div>
        <a href="https://fte.hcmut.edu.vn/" className="hover:opacity-80">
          <img src={Logo} alt="Logo" className="w-64 absolute top-0.5 left-2" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="text-white hover:opacity-80">Trang Chủ</a>
          </li>
          <li>
            <a className="text-white hover:opacity-80">Giới Thiệu</a>
          </li>
          <li>
            <a className="text-white hover:opacity-80">Tin Tức</a>
          </li>
          <li>
            <a className="text-white hover:opacity-80">Liên Hệ</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Login</a>
      </div>
    </header>
  );
}
