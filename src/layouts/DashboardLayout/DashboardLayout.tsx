import HeaderDashboard from "src/components/HeaderDashboard";
import Sidebar from "src/components/Sidebar";

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
