import { useQuery } from "@tanstack/react-query";
import { Card, Flex } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { getSubjectForThumbnail } from "src/api/Subject.api";
import Text from "src/components/Text";
import Loading from "../Loading";

interface Data {
  key: string;
  title: string;
  photo: string;
}

export default function AllSubject() {
  const subjectQuery = useQuery({
    queryKey: ["subject"],
    queryFn: () => getSubjectForThumbnail(),
  });

  return (
    <Fragment>
      {subjectQuery.isLoading ? (
        <Loading />
      ) : (
        <div className="py-6 px-10">
          <Text size="xxl" className="font-bold">
            Tất cả môn học
          </Text>
          <Flex wrap="wrap" gap="large" className="mt-2">
            {subjectQuery.isSuccess &&
              subjectQuery.data?.data.map((item: Data) => (
                <Card hoverable className="max-w-[26rem]">
                  <article className="overflow-hidden rounded-lg shadow-lg">
                    <Link to={`/subjects/${item.key}`}>
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
                          to={`/subjects/${item.key}`}
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
