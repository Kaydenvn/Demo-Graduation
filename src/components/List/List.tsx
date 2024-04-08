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

const CardList = () => {
  return (
    <div className="container mt-12 mx-auto ">
      <div className="text-2xl font-medium mb-8 px-2">Các Môn Học</div>
      <p className="text-lg text-gray-600 mb-2 px-2">
        Thông tin về các môn học và tài liệu tham khảo
      </p>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {datasource.map((item) => (
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src="https://picsum.photos/600/400/?random"
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
              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a
                  className="flex items-center no-underline hover:underline text-black"
                  href="#"
                >
                  <img
                    alt="Placeholder"
                    className="block rounded-full"
                    src="https://picsum.photos/32/32/?random"
                  />
                  <p className="ml-2 text-sm">{item.author}</p>
                </a>
                <a
                  className="no-underline text-grey-darker hover:text-red-dark"
                  href="#"
                >
                  <span className="hidden">Like</span>
                  <i className="fa fa-heart" />
                </a>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
