import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

interface Props {
  data: {
    key: string;
    title: string;
    photo: string;
  }[];
  type: string;
}

export default function CardCarousel({ data, type }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true, el: ".swiper-pagination" }}
    >
      {data.map((item) => (
        <SwiperSlide
          className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
          key={item.key}
        >
          <article className="overflow-hidden rounded-lg shadow-lg">
            <Link to={`/${type}/${item.key}`}>
              <img
                alt="Placeholder"
                className="block object-cover h-56 w-full"
                src={item.photo}
              />
            </Link>
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <Link
                  className="no-underline hover:underline text-black"
                  to={`/${type}/${item.key}`}
                >
                  {item.title}
                </Link>
              </h1>
            </header>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
