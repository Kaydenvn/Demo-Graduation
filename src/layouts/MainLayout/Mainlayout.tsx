import Footer from "src/components/Footer";
import Header from "src/components/HeaderDaisy";

export default function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full bg-white">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
