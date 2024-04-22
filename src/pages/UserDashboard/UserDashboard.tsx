import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Password from "antd/es/input/Password";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { addUser, getAllUsers } from "src/api/User.api";
import { showNotification } from "src/components/Notification/Notification";
import Text from "src/components/Text";

import { IUser } from "src/types/User.type";

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
            <Button type="link" onClick={() => callbackEdit(record.id)}>
              Sửa
            </Button>
          )}
          {isDelete && (
            <Popconfirm
              title={"Bạn có chắc chắn muốn xoá người dùng này không?"}
              onConfirm={() => callbackDelete(record.id)}
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

export default function UserDashboard() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [isAddUser, setIsAddUser] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = useForm();
  const initialFormState = {
    email: "",
    mssv: "",
    id: "",
    name: "",
    role: "",
    status: "",
    avatar: "",
    password: "",
  };
  const [formState, setFormState] = useState<IUser>(initialFormState);

  const addUserMutation = useMutation({
    mutationFn: (data: IUser) => addUser(data),
    onMutate: async () => {
      setConfirmLoading(true);
    },
    onError: (error) => {
      showNotification(error, "error");
      setConfirmLoading(false);
      setFormState(initialFormState);
      setIsAddUser(false);
    },
    onSuccess: () => {
      showNotification("Thêm người dùng thành công", "success");
      setConfirmLoading(false);
    },
  });

  const showAddUserModal = () => {
    setIsAddUser(true);
  };

  const userQuery = useQuery({
    queryKey: ["usersTable"],
    queryFn: () => getAllUsers(page, pageSize),
    staleTime: 60 * 1000,
  });

  const handleOkModal = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(() => {
        addUserMutation.mutate(formState, {
          onSuccess: () => {
            userQuery.refetch();
            showNotification("Thêm người dùng thành công", "success");
            setFormState(initialFormState);
            setConfirmLoading(false);
            setIsAddUser(false);
            setFormState(initialFormState);
            form.resetFields();
          },
        });
      })
      .catch((info) => {
        showNotification(info, "error");
      });
  };

  const handleCancelModal = () => {
    setIsAddUser(false);
    setFormState(initialFormState);
    form.resetFields();
  };

  return (
    <div className="p-4 sm:ml-64">
      <Text size="lg" className="font-bold">
        Người dùng
      </Text>
      <Flex className="mt-4">
        <Button onClick={showAddUserModal} type="primary">
          Thêm người dùng
        </Button>
      </Flex>
      <Table
        className="mt-4"
        columns={columns(
          true,
          true,
          () => {},
          () => {}
        )}
        dataSource={userQuery.data?.data}
        pagination={{
          current: page,
          pageSize,
          total: userQuery.data?.total_pages,
          onChange: (page) => {
            setPage(page);
          },
        }}
      />
      <Modal
        title="Thêm người dùng"
        open={isAddUser}
        onOk={handleOkModal}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModal}
        style={{ maxWidth: 700 }}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancelModal}>
            Huỷ
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOkModal}
            loading={confirmLoading}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18, offset: 1 }}
          form={form}
          layout="horizontal"
        >
          <Form.Item<IUser>
            label="MSSV"
            name="mssv"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, mssv: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<IUser>
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<IUser>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, email: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<IUser>
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select
              onChange={(value) => {
                setFormState({ ...formState, role: value });
              }}
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<IUser>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select
              onChange={(value) => {
                setFormState({ ...formState, status: value });
              }}
            >
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<IUser>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Password
              onChange={(e) => {
                setFormState({ ...formState, password: e.target.value });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
