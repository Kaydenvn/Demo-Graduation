import { useQuery } from "@tanstack/react-query";
import { Card, Flex } from "antd";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getModelForThumbnail } from "src/api/Model.api";
import Text from "src/components/Text";
import Loading from "../Loading";

interface Data {
  key: string;
  title: string;
  photo: string;
}

export default function AllModel() {
  const modelQuery = useQuery({
    queryKey: ["modelForTHumbnail"],
    queryFn: () => getModelForThumbnail(),
  });
  return (
    <Fragment>
      {modelQuery.isLoading ? (
        <Loading />
      ) : (
        <div className="py-6 px-10">
          <Text size="xxl" className="font-bold">
            Tất cả mô hình
          </Text>
          <Flex wrap="wrap" gap="large" className="mt-2">
            {modelQuery.isSuccess &&
              modelQuery.data?.data.map((item: Data) => (
                <Card hoverable className="max-w-[26rem]">
                  <article className="overflow-hidden rounded-lg shadow-lg">
                    <Link to={`/models/${item.key}`}>
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
                          to={`/models/${item.key}`}
                        >
                          {item.title}
                        </Link>
                      </h1>
                    </header>
                  </article>
                </Card>
              ))}
          </Flex>
        </div>
      )}
    </Fragment>
  );
}
