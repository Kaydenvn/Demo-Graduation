import avatar from "src/assets/avatar-trang-4.jpg";
import Nhan from "src/assets/Nhan.png";
import Thao from "src/assets/Thao.png";
import Tuan from "src/assets/TUan.png";

const TeacherArray = [
  {
    name: "TS.Trần Hữu Nhân",
    email: "",
    description: "",
    phone: "",
    img: Nhan,
  },
  {
    name: " PGS.TS.Lê Đình Tuân",
    email: "",
    description: "",
    phone: "",
    img: Tuan,
  },
  {
    name: "TS.Nguyễn Song Thanh Thảo",
    email: "",
    description: "",
    phone: "",
    img: Thao,
  },
];

export default function TeacherSection() {
  return (
    <section className="py-6 md:py-6 px-5">
      <div className="container mx-auto">
        <div className="text-2xl font-medium mb-10 px-2">
          Đội Ngũ Giảng Viên
        </div>
        <div className="grid grid-cols-3 gap-3 m-2">
          {TeacherArray.map((teacher, index) => {
            return (
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={teacher.img || avatar}
                    alt="Album"
                    className="p-5  w-52 rounded-3xl"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{teacher.name}</h2>
                  <p>Click the button to listen on Spotiwhy app.</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
