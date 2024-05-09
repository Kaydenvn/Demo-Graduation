import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getModelForThumbnail } from "src/api/Model.api";
import CardCarousel from "src/components/CardCarousel";

const CardList = () => {
  const modelQuery = useQuery({
    queryKey: ["modelForTHumbnail"],
    queryFn: () => getModelForThumbnail(),
  });

  return (
    <div className="container mt-12 my-2 mx-auto ">
      <div className="flex justify-between items-center ">
        <div className="text-2xl font-medium mb-8 px-2">Các Mô Hình</div>
        <Link to="/models" className="text-soft">
          Xem toàn bộ
        </Link>
      </div>
      <p className="text-lg text-gray-600 mb-2 px-2">
        Thông tin về các mô hình trong xưởng c3
      </p>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {modelQuery.isSuccess && (
          <CardCarousel data={modelQuery.data?.data} type="models" />
        )}
      </div>
    </div>
  );
};

export default CardList;
