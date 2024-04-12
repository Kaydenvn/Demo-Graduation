import Long from "src/assets/1_TranDangLong.png";
import Thong from "src/assets/Hong_Duc_Thong.png";
import Hung from "src/assets/Nguyen_Dinh_Hung.png";

import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const TeacherArray = [
  {
    name: "TS. Trần Đăng Long",
    duty: "Chủ nhiệm Bộ môn",
    email: "trandanglong@hcmut.edu.vn",
    description:
      "Tốt nghiệp Tiến sĩ Hệ thống năng lượng Hydro (2017) - Đại học Kyushu, Nhật  Bản",
    phone: "+84-28 3.864 7256 (Ext. 5650)",
    img: Long,
  },
  {
    name: "TS. Hồng Đức Thông",
    email: "hongducthong@hcmut.edu.vn",
    duty: "Phó Chủ nhiệm Bộ môn",
    description:
      "Tốt nghiệp Tiến sĩ Kỹ thuật Cơ khí động lực (2014) - Chương trình liên kết giữa Viện Công nghệ Bandung, Indonesia và Đại học Hokkaido, Japan",
    phone: "+84-28 3.864 7256 (Ext. 5650)",
    img: Thong,
  },
  {
    name: "ThS. Nguyễn Đình Hùng",
    email: "nguyendinhhung@hcmut.edu.vn",
    duty: "Chủ tịch CĐ khoa",
    description:
      "Tốt nghiệp Thạc sĩ Ô tô - Máy động lực (2004) - Đại học Bách Khoa Tp.HCM",
    phone: "+84-28 3.864 7256 (Ext. 5649)",
    img: Hung,
  },
];

export default function Team() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-2xl font-medium title-font mb-2 text-gray-900">
            BAN CHỦ NHIỆM BỘ MÔN
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {TeacherArray.map((teacher) => {
            return (
              <div className="p-4 lg:w-1/3">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    alt="team"
                    className="flex-shrink-0 rounded-lg w-full h-56 object-contain object-center mb-4 "
                    src={teacher.img}
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      {teacher.name} -{" "}
                      <span className="font-thin italic text-base">
                        {teacher.duty}
                      </span>
                    </h2>
                    <h3 className="text-gray-500 mb-3"></h3>
                    <p className="mb-4">{teacher.description}</p>
                    <p>
                      <MailOutlined /> {teacher.email}
                    </p>
                    <p>
                      <PhoneOutlined /> {teacher.phone}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
