import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Popconfirm, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Fragment, useState } from "react";
import { deleteUser, getAllUsers } from "src/api/User.api";
import { showNotification } from "src/components/Notification/Notification";
import Text from "src/components/Text";
import { IUser } from "src/types/User.type";
import AddAsset from "./AddUserDashboard";

// user value column of antd table
const columns = function (
  isUpdate: boolean,
  isDelete: boolean,
  callbackEdit: (id: string) => void,
  callbackDelete: (id: string) => void
): ColumnsType<IUser> {
  const columnTitle: ColumnsType<IUser> = [
    {
      title: "MSSV",
      dataIndex: "mssv",
      width: "10%",
      sorter: true,
      key: "mssv",
    },
    {
      title: "Họ Và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
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
              title={"Bạn có chắc chắn muốn xoá người dùng này không?"}
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

export default function UserDashboard() {
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
      showNotification("Xoá người dùng thành công", "success");
    },
  });

  const userQuery = useQuery({
    queryKey: ["usersTable"],
    queryFn: () => getAllUsers(page, pageSize),
    staleTime: 60 * 1000,
  });

  const handleDelete = (id: string) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        userQuery.refetch();
      },
    });
  };

  const handleEdit = (id: string) => {
    setOpen({ isOpen: true, id: id });
  };

  const handleInvalidate = () => {
    clientQuery.invalidateQueries({
      queryKey: ["usersTable"],
    });
  };

  return (
    <Fragment>
      <div className="p-4 sm:ml-64">
        <Text size="lg" className="font-bold">
          Người dùng
        </Text>
        <Flex className="mt-4">
          <Button
            onClick={() => setOpen({ isOpen: true })}
            className="bg-soft"
            type="primary"
          >
            Thêm người dùng
          </Button>
        </Flex>
        {userQuery.isLoading ? (
          <Skeleton active />
        ) : (
          <Table
            className="mt-4"
            columns={columns(true, true, handleEdit, handleDelete)}
            dataSource={userQuery.data?.data}
            loading={userQuery.isLoading}
            pagination={{
              current: page,
              pageSize,
              total: userQuery.data?.total_pages,
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
