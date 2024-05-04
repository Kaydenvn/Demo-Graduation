import { useQuery } from "@tanstack/react-query";
import { getAllSubjects, getSubjectForThumbnail } from "src/api/Subject.api";

const datasource = [
  {
    key: "1",
    name: "React",
    author: "Author Name",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "2",
    name: "Angular",
    author: "Author Name",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "3",
    name: "Vue",
    author: "Author Name",
    url: "https://via.placeholder.com/300",
  },
];

const ListSubject = () => {
  const subjectQuery = useQuery({
    queryKey: ["subject"],
    queryFn: () => getSubjectForThumbnail(),
  });

  return (
    <div className="container my-2 mx-auto ">
      <div className="text-2xl font-medium mb-8 px-2">Các Mô Hình</div>
      <p className="text-lg text-gray-600 mb-2 px-2">
        Các mô hình trong xưởng C3
      </p>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {subjectQuery.data.data.map(
          (item: { key: string; name: string; photo: string }) => (
            <div
              // let list srollable
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
              key={item.key}
            >
              <article className="overflow-hidden rounded-lg shadow-lg">
                <a href="#">
                  <img
                    alt="Placeholder"
                    className="block h-auto w-full"
                    src={item.photo}
                  />
                </a>
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                      {item.name}
                    </a>
                  </h1>
                </header>
              </article>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ListSubject;
