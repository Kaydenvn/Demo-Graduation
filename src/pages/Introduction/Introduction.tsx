import React from "react";
import TapTheKTGT from "src/assets/Tap_the_KTGT.jpg";
import TimeLine from "src/assets/TimeLine_FTE.png";

export default function Introduction() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-2">
          <h2 className="text-sm text-soft tracking-widest font-medium title-font mb-1">
            Đại học Bách Khoa Tp.HCM
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            KHOA KỸ THUẬT GIAO THÔNG
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Khoa Kỹ thuật Giao thông được thành lập ngày 15/6/2000 từ việc hợp
            nhất 3 bộ môn: Bộ môn Kỹ thuật Ôtô - Máy động lực (thành lập 1976),
            Bộ môn Kỹ thuật Tàu thủy (thành lập 1990), Bộ môn Kỹ thuật Hàng
            không (thành lập 1996), .
          </p>
        </div>
        <p className="my-4 leading-relaxed text-base">
          Dù chỉ mới thành lập từ ngay đầu thế kỹ XX nhưng 2/3 thành viên của
          Khoa đã có khởi nguồn từ rất sớm, trong những năm đầu hình thành một
          trong các cơ sở đào tạo nhân lực kỹ thuật quy mô nhất cả nước. Trung
          tâm Quốc gia Kỹ thuật (1957), Học viện Quốc gia Kỹ thuật (1972), Viện
          Đại học Bách Khoa Thủ Đức (1973) và sau ngày thống nhất đất nước là
          Đại học Bách Khoa Tp.HCM (1976) đã trở thành cái nôi của Khoa Kỹ thuật
          Giao thông - ĐHBKTp.HCM.
        </p>
        <p className="my-4 leading-relaxed text-base">
          Với một lịch sử phát triển năng động, sáng tạo từ 2000, Khoa Kỹ thuật
          Giao thông là cơ sở khoa học xuất sắc trong đào tạo, NCKH & CGCN về kỹ
          thuật ôtô, kỹ thuật hàng không, kỹ thuật tàu thủy tại Việt Nam và xa
          hơn thế nữa. Tọa lạc tại thành phố Hồ Chí Minh, thành phố có nền kinh
          tế lớn nhất cả nước, Khoa Kỹ thuật Giao thông tiếp tục có những đóng
          góp đáng kể cho sự tiến bộ trong nước và quốc tế trong các lĩnh vực
          liên quan đến kỹ thuật phương tiện giao thông. Khoa cũng là cơ sở đào
          tạo uy tín cung cấp nguồn nhân lực chất lượng cao tại Việt Nam. Sinh
          viên được đào tạo với kiến thức khoa học phong phú và trình độ và kỹ
          năng chuyên môn cao, thái độ tốt và chuyên nghiệp. Khoa cũng có môi
          trường học tập, nghiên cứu và chuyển giao công nghệ chuyên nghiệp,
          được hỗ trợ tích cực bởi các dịch vụ và cơ sở vật chất hiện đại và cập
          nhật cho giảng viên, sinh viên, đối tác công nghiệp.
        </p>
        <img src={TapTheKTGT} alt="TapTheKTGT" className="w-auto" />
        <div className="divider my-10"></div>
        <div className="flex flex-col text-center w-full mt-10 mb-2">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            LỊCH SỬ HÌNH THÀNH
          </h1>
          <img src={TimeLine} alt="TimeLine" className="w-auto" />
        </div>
      </div>
    </section>
  );
}
