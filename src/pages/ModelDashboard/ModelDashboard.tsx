import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Image, Popconfirm, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Fragment, useState } from "react";
import { deleteModel, getAllModels } from "src/api/Model.api";
import { showNotification } from "src/components/Notification/Notification";
import Text from "src/components/Text";
import { IModel } from "src/types/Model.type";
import AddAsset from "./AddModelDashboard";

// user value column of antd table
const columns = function (
  isUpdate: boolean,
  isDelete: boolean,
  callbackEdit: (id: string) => void,
  callbackDelete: (id: string) => void
): ColumnsType<IModel> {
  const columnTitle: ColumnsType<IModel> = [
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
      render: (_: string, record: IModel) =>
        record.startDate && new Date(record.startDate).toLocaleDateString(),
    },
    {
      title: "Ngày bảo dưỡng",
      dataIndex: "maintainTime",
      key: "maintainTime",
      render: (_: string, record: IModel) =>
        record.maintainTime &&
        new Date(record.maintainTime).toLocaleDateString(),
    },
    {
      title: "Ảnh mô hình",
      key: "photo",
      dataIndex: "photo",
      render: (_: string, record: IModel) => (
        <Image.PreviewGroup>
          {record.photo.map((item, index) => (
            <Image key={index} width={50} src={item} alt="Ảnh mô hình" />
          ))}
        </Image.PreviewGroup>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 100,
      render: (_: string, record: IModel) => (
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

export default function ModelDashboard() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const clientQuery = useQueryClient();

  const [open, setOpen] = useState<OpenType>({ isOpen: false });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteModel(id),

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
