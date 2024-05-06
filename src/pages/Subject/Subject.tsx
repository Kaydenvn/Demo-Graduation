import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { getSubjectById } from "src/api/Subject.api";
import Text from "src/components/Text";

interface IData {
  nameOfdocs: string;
  linkOfdocs: string;
}

export default function Subject() {
  // scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get id from params
  const { id } = useParams();

  const subjectQueryById = useQuery({
    queryKey: ["subjectbyid"],
    queryFn: () => {
      if (id) {
        return getSubjectById(id);
      }
    },
  });

  const columns = [
    {
      title: "Tên tài liệu",
      dataIndex: "nameOfdocs",
      key: "nameOfdocs",
    },
    {
      title: "Link tài liệu",
      dataIndex: "linkOfdocs",
      key: "linkOfdocs",
      render: (_: string, record: IData) => (
        <a
          href={record.linkOfdocs}
          className="text-soft"
          target="_blank"
          rel="noreferrer"
        >
          {record.linkOfdocs}
        </a>
      ),
    },
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg min-h-16  overflow-hidden">
            <img
              alt="content"
              className="object-fit w-full h-full"
              src={subjectQueryById.data?.photo}
            />
          </div>
          <div className="mt-10">
            <Text size="xxl" className="font-bold">
              {subjectQueryById.data?.title}
            </Text>
            <div className="mt-2">
              <h2 className="px-2 font-bold">Mô tả</h2>
              <Text>{subjectQueryById.data?.description}</Text>
            </div>
          </div>
        </div>
      </div>
      <Table
        className="px-5 py-10"
        columns={columns}
        dataSource={subjectQueryById.data?.docs}
      />
    </section>
  );
}
