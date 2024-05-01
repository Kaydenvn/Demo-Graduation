import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Popconfirm, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Fragment, useState } from "react";
import { getAllModels } from "src/api/Model.api";
import { deleteUser } from "src/api/User.api";
import { showNotification } from "src/components/Notification/Notification";
import Text from "src/components/Text";
import { IUser } from "src/types/User.type";
import AddAsset from "./AddModelDashboard";

// user value column of antd table
const columns = function (
  isUpdate: boolean,
  isDelete: boolean,
  callbackEdit: (id: string) => void,
  callbackDelete: (id: string) => void
): ColumnsType<IUser> {
  const columnTitle: ColumnsType<IUser> = [
    {
      title: "Tên mô hình",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại mô hình",
      dataIndex: "modelType",
      key: "modelType",
    },
    {
      title: "Ngày nhập xưởng",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày bảo dưỡng",
      dataIndex: "maintainTime",
      key: "maintainTime",
    },
    {
      title: "Ảnh mô hình",
      key: "photo",
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 100,
      render: (_: string, record: IUser) => (
        <Space size="small">
          {isUpdate && (
            <Button type="link" onClick={() => callbackEdit(record._id)}>
              Sửa
            </Button>
          )}
          {isDelete && (
            <Popconfirm
              title={"Bạn có chắc chắn muốn xoá mô hình này không?"}
              okButtonProps={{ className: "bg-soft" }}
            >
              <Button
                type="link"
                danger
                onClick={() => callbackDelete(record._id)}
              >
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

export default function ModelDashboard() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const clientQuery = useQueryClient();

  const [open, setOpen] = useState<OpenType>({ isOpen: false });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),

    onError: (error) => {
      showNotification(error, "error");
    },
    onSuccess: () => {
      showNotification("Xoá mô hình thành công", "success");
    },
  });

  const modelQuery = useQuery({
    queryKey: ["modelsTable"],
    queryFn: () => getAllModels(page, pageSize),
    staleTime: 60 * 1000,
  });

  const handleDelete = (id: string) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        modelQuery.refetch();
      },
    });
  };

  const handleEdit = (id: string) => {
    setOpen({ isOpen: true, id: id });
  };

  const handleInvalidate = () => {
    clientQuery.invalidateQueries({
      queryKey: ["modelsTable"],
    });
  };

  return (
    <Fragment>
      <div className="p-4 sm:ml-64">
        <Text size="lg" className="font-bold">
          Mô hình
        </Text>
        <Flex className="mt-4">
          <Button
            onClick={() => setOpen({ isOpen: true })}
            className="bg-soft"
            type="primary"
          >
            Thêm mô hình
          </Button>
        </Flex>
        {modelQuery.isLoading ? (
          <Skeleton active />
        ) : (
          <Table
            className="mt-4"
            columns={columns(true, true, handleEdit, handleDelete)}
            dataSource={modelQuery.data?.data}
            loading={modelQuery.isLoading}
            pagination={{
              current: page,
              pageSize,
              total: modelQuery.data?.total_pages,
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
