import { Image } from "antd";

export default function BoschLab() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-2">
          <h2 className="text-sm text-soft tracking-widest font-medium title-font mb-1">
            Đại học Bách Khoa Tp.HCM
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            PHÒNG THÍ NGHIỆM CÔNG NGHỆ Ô-TÔ BOSCH
          </h1>
          <iframe
            src="https://res.cloudinary.com/daz2egfqq/video/upload/v1716908938/hiqcle8do6pk9qxsp7hp.webm"
            title="BoschLab"
            className="w-auto h-screen"
          />
        </div>
        <p className="my-4 leading-relaxed text-base">
          Phòng thí nghiệm Công nghệ Ô-tô Bosch tại Khoa Kỹ thuật Giao thông
          được trang bị để hỗ trợ các chương trình nghiên cứu và đào tạo sinh
          viên. Phòng thí nghiệm Công nghệ Ô tô Bosch được trang bị các dụng cụ
          thí nghiệm và thiết bị của Bosch, nhằm thiết lập một môi trường học
          tập hiệu quả và thực tế cho các buổi đào tạo và thực hành. Phòng thí
          nghiệm được bố trí Bộ cảm biến mức nhiên liệu (fuel level sensor –
          FLS) và hộp số vô cấp (continuously variable transmission – CVT), nhằm
          cung cấp cho sinh viên kiến thức thực tế về cơ chế hoạt động và cảm
          biến đo mức nhiên liệu của xe ô tô và các bộ phận xe khác. Sinh viên
          sẽ có cơ hội được học hỏi và đào tạo bằng công nghệ đạt tiêu chuẩn
          Đức, dưới sự cố vấn của chuyên gia từ Bosch, cũng như tiếp cận với
          nhiều chương trình phát triển tài năng và cơ hội thực tập tại Công ty.
        </p>

        <Image
          src="https://fte.hcmut.edu.vn/static/images/BOSCH_Lab_Concept.PNG"
          alt="BoschLab"
          className="w-auto"
        />
        <Image
          src="https://fte.hcmut.edu.vn/static/images/BOSCH_Lab_facilities.PNG"
          alt="BoschLab"
          className="w-auto"
        />
      </div>
    </section>
  );
}
