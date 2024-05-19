import {
  DashboardOutlined,
  UserOutlined,
  ProductOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-24 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <DashboardOutlined />
              <span className="ms-3">Quản lý</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/users"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <UserOutlined />
              <span className="ms-3">Người dùng </span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/models"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <ProductOutlined />
              <span className="ms-3">Mô hình </span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/subjects"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <BookOutlined />
              <span className="ms-3">Môn học </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/subjects"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <BookOutlined />
              <span className="ms-3">OBD </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
