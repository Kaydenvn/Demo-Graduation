import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Image, Input } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getModelById } from "src/api/Model.api";
import ScrollToTop from "src/utils/ScrollToTop";
import Loading from "../Loading";

export default function Model() {
  ScrollToTop();
  const { id } = useParams();
  const [no, setNo] = useState(0);
  const [nt, setNt] = useState(0);
  const [result, setResult] = useState(0);

  const modelQueryById = useQuery({
    queryKey: [`modelby${id}`],
    queryFn: () => {
      if (id) {
        return getModelById(id);
      }
    },
  });

  const [images, setImages] = useState([]);

  const [activeImg, setActiveImage] = useState("");

  useEffect(() => {
    if (modelQueryById.data) {
      setImages(modelQueryById.data.photo);
      setActiveImage(
        modelQueryById.data.photo ? modelQueryById.data.photo[0] : ""
      );
    }
  }, [modelQueryById.data]);

  return (
    <Fragment>
      {modelQueryById.isLoading ? (
        <Loading />
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 mx-auto mb-24">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded">
                <Image
                  alt="ecommerce"
                  className="w-full h-full aspect-square object-cover rounded-xl"
                  src={activeImg}
                />
                <div className="flex flex-row justify-between mt-2 h-24">
                  {/* if images length = 1 dont show  */}
                  {images.length > 1
                    ? images.map((img: string, index: number) => (
                        <img
                          key={index}
                          alt="ecommerce"
                          className="w-24 h-24 aspect-square object-cover rounded-xl cursor-pointer"
                          src={img}
                          onClick={() => setActiveImage(img)}
                        />
                      ))
                    : ""}
                </div>
              </div>
              <div className="sm:mt-32 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {modelQueryById.data?.modelType}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {modelQueryById.data?.title}
                </h1>

                <p className="leading-relaxed">
                  {modelQueryById.data?.description}
                </p>
                <p className="mt-10 font-bold">
                  Bộ công cụ tính xác xuất hư hỏng
                </p>
                <p>Trong đó:</p>
                <Flex gap={24}>
                  <p>nt: số phần tử không hư hỏng</p>
                  <p>no: số phần tử có trong hệ thống</p>
                </Flex>
                <p className="mt-6">Bảng tính:</p>
                <Flex gap={24} className="mt-1">
                  <Input
                    className="w-1/2"
                    placeholder="Số phần tử không hư hỏng"
                    onChange={(e) => {
                      setNt(Number(e.target.value));
                    }}
                  />
                  <Input
                    className="w-1/2"
                    placeholder="Số phần tử có trong hệ thống"
                    onChange={(e) => {
                      setNo(Number(e.target.value));
                    }}
                  />
                </Flex>
                <Button
                  className="mt-2"
                  onClick={() => {
                    if (nt === 0 || no === 0) {
                      return;
                    }
                    setResult(((no - nt) / no) * 100);
                  }}
                  type="primary"
                >
                  Thực hiện phép tính
                </Button>
                <p className="mt-2">
                  Kết quả: {result != 0 ? result + "%" : ""}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
}
