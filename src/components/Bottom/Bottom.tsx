import Logo from "src/assets/bk-logo.png";

export default function Bottom() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container py-6 mx-auto flex items-center justify-center sm:flex-row flex-col">
        <div className="flex justify-center items-center">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src={Logo} alt="logo" className="w-10 object-fit" />
            <span className="ml-3 text-xl text-primary">KTGT</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 Bản quyền thuộc Khoa Kỹ thuật Giao thông - Trường Đại học
            Bách khoa - Đại học Quốc gia TP. HCM
          </p>
        </div>
      </div>
    </footer>
  );
}
