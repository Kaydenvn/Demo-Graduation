import Logo from "src/assets/logobachkhoatoi.png";

export default function Header() {
  return (
    <div className="navbar bg-primary rounded-b">
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
        <a
          href="https://hcmut.edu.vn/"
          className="btn btn-ghost text-xl text-primary items-center justify-center"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-20 inline-block items-center"
          />
          <div className="hidden md:block">Khoa Kỹ Thuật Giao Thông</div>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="text-white">Trang Chủ</a>
          </li>
          <li>
            <a className="text-white">Giới Thiệu</a>
          </li>
          <li>
            <a className="text-white">Tin Tc</a>
          </li>
          <li>
            <a className="text-white">Liên Hệ</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Login</a>
      </div>
    </div>
  );
}
