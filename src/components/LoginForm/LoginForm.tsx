import { Link } from "react-router-dom";
import Logo from "src/assets/bk-logo.png";

export default function LoginForm() {
  return (
    <div className="lg:w-2/6 md:w-1/2 bg-gray-50 rounded-lg p-8 flex flex-col md:ml-10 w-full mt-10 md:mt-0">
      <div className="mb-10">
        <Link to="/" className="flex justify-center">
          <img alt="" className="w-20" src={Logo} />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Đăng Nhập
        </h2>
        <p className="text-center text-sm text-gray-600 mt-5">
          Bạn không có tài khoản? Hãy liên hệ{" "}
          <Link to="#" className="font-medium text-primary hover:opacity-80">
            quản trị viên
          </Link>
        </p>
      </div>

      <div className="relative mb-4">
        <label className="input input-bordered mb-7 flex items-center gap-2">
          Email
          <input
            type="text"
            className="grow"
            placeholder="example@hcmut.edu.vn"
          />
        </label>
        <label className="input input-bordered mb-7 flex items-center gap-2">
          Password
          <input type="password" className="grow" placeholder="********" />
        </label>
      </div>
      <button className="text-white bg-soft border-0 py-2 px-8 focus:outline-none hover:opacity-80 rounded text-lg">
        Button
      </button>
    </div>
  );
}
