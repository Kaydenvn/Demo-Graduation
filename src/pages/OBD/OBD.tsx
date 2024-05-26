import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Dayjs from "dayjs";
import React, { Fragment, useState } from "react";
import { getAllObds } from "src/api/Obd.api";
import Text from "src/components/Text";
import { IObd } from "src/types/Obd.type";

const columnTitle: ColumnsType<IObd> = [
  {
    title: "Tên mã lỗi",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render(_: string, record: IObd) {
      return record.status == "Done" ? "Đã xử lý" : "Chưa xử lý";
    },
    width: "8%",
  },
  {
    title: "Ngày nhận lỗi",
    dataIndex: "createDate",
    key: "createDate",
    render(_: string, record: IObd) {
      return Dayjs(record.createDate).format("DD/MM/YYYY");
    },
    width: "8%",
  },
  {
    title: "Ngày xử lý",
    dataIndex: "doneDate",
    key: "doneDate",
    render(_: string, record: IObd) {
      return <>{record.doneDate ? record.doneDate.toString() : "Chưa xử lý"}</>;
    },
    width: "8%",
  },
];

export default function OBD() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const obdQuery = useQuery({
    queryKey: ["obdsTable"],
    queryFn: () => getAllObds(page, pageSize),
    staleTime: 60 * 1000,
  });
  return (
    <Fragment>
      <div className="container px-10 py-6">
        <Text size="xxl" className="font-bold">
          Mã lỗi OBD-II lấy trực tiếp trên mô hình
        </Text>
        <p className="mt-2">Tên mô hình Hyundai D4ea Commonrail</p>
      </div>
      <div className="px-6">
        <Table
          columns={columnTitle}
          dataSource={obdQuery.data?.data}
          loading={obdQuery.isLoading}
          pagination={{
            current: page,
            pageSize,
            total: obdQuery.data?.total_pages,
            onChange: (page) => {
              setPage(page);
            },
          }}
          rowKey={(record) => record._id}
        />
      </div>
    </Fragment>
  );
}
