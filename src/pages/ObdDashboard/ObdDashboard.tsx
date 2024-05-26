import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Popconfirm, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Fragment, useState } from "react";
import { deleteObd, getAllObds, syncObd } from "src/api/Obd.api";
import { showNotification } from "src/components/Notification/Notification";
import Text from "src/components/Text";
import { IObd } from "src/types/Obd.type";
import AddAsset from "./AddObdDashboard";
import Dayjs from "dayjs";

// user value column of antd table
const columns = function (
  isUpdate: boolean,
  isDelete: boolean,
  callbackEdit: (id: string) => void,
  callbackDelete: (id: string) => void
): ColumnsType<IObd> {
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
        return (
          <>
            {record.doneDate
              ? Dayjs(record.doneDate).format("DD/MM/YYYY")
              : "Chưa xử lý"}
          </>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 100,
      render: (_: string, record: IObd) => (
        <Space size="small">
          {isUpdate && (
            <Button type="link" onClick={() => callbackEdit(record._id)}>
              Sửa
            </Button>
          )}
          {isDelete && (
            <Popconfirm
              title={"Bạn có chắc chắn muốn xoá lỗi này không?"}
              okButtonProps={{ className: "bg-soft" }}
              onConfirm={() => callbackDelete(record._id)}
            >
              <Button type="link" danger>
                Xoá
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
  return columnTitle;
};

export interface OpenType {
  isOpen: boolean;
  id?: string;
}

export default function ObdDashboard() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const clientQuery = useQueryClient();

  const [open, setOpen] = useState<OpenType>({ isOpen: false });

  const deleteObdMutation = useMutation({
    mutationFn: (id: string) => deleteObd(id),

    onError: (error) => {
      showNotification(error, "error");
    },
    onSuccess: () => {
      showNotification("Xoá lỗi thành công", "success");
      handleInvalidate();
    },
  });

  const obdQuery = useQuery({
    queryKey: ["obdsTable"],
    queryFn: () => getAllObds(page, pageSize),
    staleTime: 60 * 1000,
  });

  const handleDelete = (id: string) => {
    deleteObdMutation.mutate(id, {
      onSuccess: () => {
        obdQuery.refetch();
      },
    });
  };

  const handleEdit = (id: string) => {
    setOpen({ isOpen: true, id: id });
  };

  const handleInvalidate = () => {
    clientQuery.invalidateQueries({
      queryKey: ["obdsTable"],
    });
  };

  const handleFirebase = async () => {
    const data = await syncObd();
    if (!data.added) {
      showNotification("Không có mã lỗi mới", "info");
    } else {
      showNotification("Cập nhật thành công", "success");
      handleInvalidate();
    }
  };

  return (
    <Fragment>
      <div className="p-4 sm:ml-64">
        <Text size="lg" className="font-bold">
          OBD
        </Text>
        <Flex className="mt-4" gap={20}>
          <Button
            onClick={() => setOpen({ isOpen: true })}
            className="bg-soft"
            type="primary"
          >
            Thêm mã lỗi OBD
          </Button>
          <Button className="bg-soft" type="primary" onClick={handleFirebase}>
            Tự động cập nhật từ mô hình
          </Button>
        </Flex>
        {obdQuery.isLoading ? (
          <Skeleton active />
        ) : (
          <Table
            className="mt-4"
            columns={columns(true, true, handleEdit, handleDelete)}
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
        )}
      </div>
      <AddAsset
        open={open}
        setOpen={setOpen}
        handleInvalidate={handleInvalidate}
      />
    </Fragment>
  );
}
