import { Outlet } from "react-router-dom";
import Bottom from "src/components/Bottom/Bottom";
import Footer from "src/components/Footer";
import Header from "src/components/HeaderDaisy";

export default function Mainlayout() {
  return (
    <div className="relative w-full bg-white">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <Bottom />
    </div>
  );
}
