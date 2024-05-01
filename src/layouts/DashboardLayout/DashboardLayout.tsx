import { Outlet } from "react-router-dom";
import Bottom from "src/components/Bottom/Bottom";
import HeaderDashboard from "src/components/Dashboard/HeaderDashboard";
import Sidebar from "src/components/Dashboard/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="relative w-full bg-white">
      <HeaderDashboard />
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
