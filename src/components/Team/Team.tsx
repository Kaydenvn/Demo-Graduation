import Nhan from "src/assets/Nhan.png";
import Thao from "src/assets/Thao.png";
import Tuan from "src/assets/TUan.png";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const TeacherArray = [
  {
    name: "TS.Trần Hữu Nhân",
    email: "thnhan@hcmut.edu.vn",
    description:
      "Trưởng khoa, phụ trách về quy hoạch & định hướng phát triển, nhân sự, tài chính, cơ sở vật chất, khen thưởng",
    phone: "+84-028-3864 7257",
    img: Nhan,
  },
  {
    name: " PGS.TS.Lê Đình Tuân",
    email: "tuan-ledinh@hcmut.edu.vn",
    description:
      "Phó trưởng khoa, phụ trách về Khoa học & Công nghệ, Quan hệ đối ngoại",
    phone: "+84-028-3864 7257",
    img: Tuan,
  },
  {
    name: "TS.Nguyễn Song Thanh Thảo",
    email: "nguyensongthanhthao@hcmut.edu.vn",
    description:
      "Phó trưởng khoa, phụ trách về Đào tạo, Chương trình CLC & PFIEV, Công tác SV, ĐBCL & ISO",
    phone: "+84-028-3864 7257",
    img: Thao,
  },
];

export default function Team() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-2xl font-medium title-font mb-2 text-gray-900">
            BAN CHỦ NHIỆM KHOA
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {TeacherArray.map((teacher, index) => {
            return (
              <div className="p-4 lg:w-1/3">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    alt="team"
                    className="flex-shrink-0 rounded-lg w-full h-56 object-contain object-center mb-4"
                    src={teacher.img}
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      {teacher.name}
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
