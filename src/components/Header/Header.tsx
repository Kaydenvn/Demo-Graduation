import { Layout, MenuProps, Menu } from "antd";
import "./Header.scss";
import { useEffect, useState } from "react";
import Logo from "src/assets/logobachkhoatoi.png";
import { Link } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";

const { Header: HeaderAntd } = Layout;

const headerItems = [
  {
    label: "Trang chủ",
    key: "home",
    path: "/",
  },
  {
    label: "Giới thiệu",
    key: "introduce",
    path: "/introduce",
  },
  {
    label: "Tin tức",
    key: "news",
    path: "/news",
  },
  {
    label: "Liên hệ",
    key: "contact",
    path: "/contact",
  },
];

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={` ${isSticky ? "sticky top-0 left-0 right-0 bord" : ""}`}>
      <div className="flex bg-primary items-center w-full text-base  p-2 sm:flex-col  sm:gap-2  md:min-h-10 lg:flex-row lg:gap-20">
        <a
          href="https://hcmut.edu.vn/"
          className="font-semibold flex items-center basis-1/2"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-20 inline-block items-center"
          />
          <div className="md:flex hidden flex-col ">
            <span className="text-white text-xs">
              Đại học Quốc gia Thành phố Hồ Chí Minh
            </span>
            <span className="text-white text-xl">Trường Đại học Bách Khoa</span>
          </div>
        </a>

        <div className="flex md:justify-between w-full sm:justify-end sm:gap-10">
          {/* Menu */}
          <ul className="md:flex space-x-12 hidden items-center justify-center">
            {headerItems.map((item) => {
              return (
                <Link to={item.path} key={item.key}>
                  <li className="text-white font-semibold block text-base first:font-medium">
                    {item.label}
                  </li>
                </Link>
              );
            })}
          </ul>

          {/* Button */}
          <Link
            to="/login"
            className="lg:bg-white md:bg-white text-primary  py-2 px-4 mr-4 transition-all duration-300 rounded"
          >
            Login
          </Link>

          {/* Menu for mobile */}
          <div className="md:hidden">
            <button className="focus:outline-none ml-44 focus:text-gray-500">
              {isMenuOpen ? (
                <FaXmark
                  className="h-6 w-6 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                />
              ) : (
                <FaBars
                  className="h-6 w-6 text-gray-600"
                  onClick={() => setIsMenuOpen(true)}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
