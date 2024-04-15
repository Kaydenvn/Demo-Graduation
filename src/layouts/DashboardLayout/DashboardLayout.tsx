import HeaderDashboard from "src/components/Dashboard/HeaderDashboard";
import Sidebar from "src/components/Dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full bg-white">
      <HeaderDashboard />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
