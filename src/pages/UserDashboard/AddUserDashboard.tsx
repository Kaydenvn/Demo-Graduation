import React, { useEffect, useState } from "react";
import { OpenType } from "./UserDashboard";
import { Button, Form, Input, Modal, Select, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";

import { IUser } from "src/types/User.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUser, getUserById, updateUser } from "src/api/User.api";
import { showNotification } from "src/components/Notification/Notification";

interface Props {
  open: OpenType;
  setOpen: React.Dispatch<React.SetStateAction<OpenType>>;
  handleInvalidate: () => void;
}

const initialFormState: IUser = {
  mssv: "",
  name: "",
  email: "",
  role: "user",
  status: "active",
  _id: "",
  avatar: "",
  password: "Password123",
};

export default function AddUserDashboard({
  open,
  setOpen,
  handleInvalidate,
}: Props) {
  const [form] = useForm();
  const [formState, setFormState] = useState<IUser>(initialFormState);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addUserMutation = useMutation({
    mutationFn: (data: IUser) => addUser(data),
    onMutate: async () => {
      setConfirmLoading(true);
    },
    onError: (error) => {
      showNotification(error, "error");
      setConfirmLoading(false);
      setFormState(initialFormState);
    },
    onSuccess: () => {
      showNotification("Thêm người dùng thành công", "success");
      setConfirmLoading(false);
    },
  });

  const isEdit = Boolean(open.id);

  const updateUserMutation = useMutation({
    mutationFn: (data: IUser) => updateUser(data),
    onMutate: async () => {
      setConfirmLoading(true);
    },
    onError: (error) => {
      showNotification(error, "error");
      setConfirmLoading(false);
      setFormState(initialFormState);
    },
    onSuccess: () => {
      showNotification("Cập nhật người dùng thành công", "success");
      setConfirmLoading(false);
    },
  });

  const userbyIdQuery = useQuery({
    queryKey: ["userById", open.id],
    queryFn: () => {
      if (open.id) {
        return getUserById(open.id);
      }
    },
    enabled: !!open.id,
  });
  useEffect(() => {
    if (userbyIdQuery.isSuccess) {
      const editUser = {
        ...userbyIdQuery.data,
        password: "",
      };
      setFormState(editUser);
    }
  }, [userbyIdQuery.data, userbyIdQuery.isSuccess]);

  const handleCancelModal = () => {
    setOpen({ isOpen: false });
    setFormState(initialFormState);
    form.resetFields();
  };

  const handleOkModal = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(() => {
        if (isEdit) {
          updateUserMutation.mutate(formState, {
            onSuccess: () => {
              handleInvalidate();
              setFormState(initialFormState);
              setConfirmLoading(false);
              setOpen({ isOpen: false });
            },
          });
        } else {
          addUserMutation.mutate(formState, {
            onSuccess: () => {
              handleInvalidate();
              setFormState(initialFormState);
              setConfirmLoading(false);
              setOpen({ isOpen: false });
            },
          });
        }
      })
      .catch(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      title="Thêm người dùng"
      open={open.isOpen}
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
          className="bg-soft"
          onClick={handleOkModal}
          loading={confirmLoading}
        >
          Xác nhận
        </Button>,
      ]}
    >
      {userbyIdQuery.isFetching && isEdit ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16, offset: 1 }}
          form={form}
          layout="horizontal"
          fields={[
            { name: ["mssv"], value: formState.mssv },
            { name: ["name"], value: formState.name },
            { name: ["email"], value: formState.email },
            { name: ["role"], value: formState.role },
            { name: ["status"], value: formState.status },
            { name: ["password"], value: formState.password },
          ]}
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
                setFormState({ ...formState, role: value.value });
              }}
              defaultValue={{ label: "User", value: "user" }}
              options={[
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
              ]}
            />
          </Form.Item>

          <Form.Item<IUser>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select
              onChange={(value) => {
                setFormState({ ...formState, status: value.value });
              }}
              defaultValue={{ label: "Active", value: "active" }}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
