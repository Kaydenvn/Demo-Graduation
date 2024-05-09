import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getSubjectForThumbnail } from "src/api/Subject.api";
import CardCarousel from "src/components/CardCarousel";

const ListSubject = () => {
  const subjectQuery = useQuery({
    queryKey: ["subject"],
    queryFn: () => getSubjectForThumbnail(),
  });

  return (
    <div className="container mt-12 my-2 mx-auto ">
      <div className="flex justify-between items-center ">
        <div className="text-2xl font-medium mb-8 px-2">Các Môn Học</div>
        <Link to="/subjects" className="text-soft">
          Xem toàn bộ
        </Link>
      </div>
      <p className="text-lg text-gray-600 mb-2 px-2">
        Thông tin về các môn học và tài liệu tham khảo
      </p>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {subjectQuery.isSuccess && (
          <CardCarousel data={subjectQuery.data?.data} type="subjects" />
        )}
      </div>
    </div>
  );
};

export default ListSubject;
