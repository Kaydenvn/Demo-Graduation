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
      <Footer
        colorBgContainer="white"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: "var(--footer-height)",
          textAlign: "center",
          lineHeight: "var(--footer-height)",
          fontSize: "12px",
          padding: "0",
        }}
        className="border-t border-gray-200"
      />
    </div>
  );
}
