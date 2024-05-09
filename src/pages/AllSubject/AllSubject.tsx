import { useQuery } from "@tanstack/react-query";
import { Card, Flex } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { getSubjectForThumbnail } from "src/api/Subject.api";
import Text from "src/components/Text";

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
      <div className="container">
        <div className="py-6 px-16">
          <Text size="xxl" className="font-bold">
            Tất cả môn học
          </Text>
          <Flex wrap="wrap" gap="large" className="mt-2">
            {subjectQuery.isSuccess &&
              subjectQuery.data?.data.map((item: Data) => (
                <Card hoverable>
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
                        <a
                          className="no-underline hover:underline text-black"
                          href="#"
                        >
                          {item.title}
                        </a>
                      </h1>
                    </header>
                  </article>
                </Card>
              ))}
          </Flex>
        </div>
      </div>
    </Fragment>
  );
}
