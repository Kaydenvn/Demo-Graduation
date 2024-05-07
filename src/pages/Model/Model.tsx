import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getModelById } from "src/api/Model.api";
import ScrollToTop from "src/utils/ScrollToTop";

export default function Model() {
  ScrollToTop();
  const { id } = useParams();

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
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded">
            <img
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
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {modelQueryById.data?.modelType}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {modelQueryById.data?.title}
            </h1>

            <p className="leading-relaxed">
              {modelQueryById.data?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
