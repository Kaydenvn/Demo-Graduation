import { Button, Form, Input, Modal, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { OpenType } from "./SubjectDashboard";

import { useMutation, useQuery } from "@tanstack/react-query";
import { addSubject, updateSubject } from "src/api/Subject.api";
import { getUserById } from "src/api/User.api";
import { showNotification } from "src/components/Notification/Notification";
import { ISubject } from "src/types/Subject.type";
import TextArea from "antd/es/input/TextArea";

interface Props {
  open: OpenType;
  setOpen: React.Dispatch<React.SetStateAction<OpenType>>;
  handleInvalidate: () => void;
}

const initialFormState: ISubject = {
  _id: "",
  title: "",
  description: "",
  nameOfdocs: [],
  linkOfdocs: [],
  creator: "",
};

export default function AddSubjectDashboard({
  open,
  setOpen,
  handleInvalidate,
}: Props) {
  const [form] = useForm();
  const [formState, setFormState] = useState<ISubject>(initialFormState);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addSubjectMutation = useMutation({
    mutationFn: (data: ISubject) => addSubject(data),
    onMutate: async () => {
      setConfirmLoading(true);
    },
    onError: (error) => {
      showNotification(error, "error");
      setConfirmLoading(false);
      setFormState(initialFormState);
    },
    onSuccess: () => {
      showNotification("Thêm môn học thành công", "success");
      setConfirmLoading(false);
    },
  });

  const isEdit = Boolean(open.id);

  const updateSubjectMutation = useMutation({
    mutationFn: (data: ISubject) => updateSubject(data),
    onMutate: async () => {
      setConfirmLoading(true);
    },
    onError: (error) => {
      showNotification(error, "error");
      setConfirmLoading(false);
      setFormState(initialFormState);
    },
    onSuccess: () => {
      showNotification("Cập nhật môn học thành công", "success");
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
          updateSubjectMutation.mutate(formState, {
            onSuccess: () => {
              handleInvalidate();
              showNotification("Cập nhật người dùng thành công", "success");
              setFormState(initialFormState);
              setConfirmLoading(false);
              setOpen({ isOpen: false });
            },
          });
        } else {
          addSubjectMutation.mutate(formState, {
            onSuccess: () => {
              handleInvalidate();
              showNotification("Thêm người dùng thành công", "success");
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
          labelCol={{ span: 18 }}
          wrapperCol={{ span: 20, offset: 1 }}
          form={form}
          layout="vertical"
          fields={[
            { name: ["title"], value: formState.title },
            { name: ["description"], value: formState.description },
            { name: ["nameOfdocs"], value: formState.nameOfdocs },
            { name: ["linkOfdocs"], value: formState.linkOfdocs },
            { name: ["creator"], value: formState.creator },
          ]}
        >
          <Form.Item<ISubject>
            label="Tên môn học"
            name="title"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, title: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<ISubject>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, description: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<ISubject>
            label="Tên tài liệu (mỗi tài liệu cách nhau bởi dấu ,)"
            name="nameOfdocs"
            rules={[{ required: true, message: "Hãy nhập tên tài liệu" }]}
          >
            <TextArea
              rows={4}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  nameOfdocs: e.target.value.split(","),
                });
              }}
            />
          </Form.Item>

          <Form.Item<ISubject>
            label="Link tài liệu (mỗi tài liệu cách nhau bởi dấu ,)"
            name="linkOfdocs"
            rules={[{ required: true, message: "Hãy nhập link tài liệu" }]}
          >
            <TextArea
              rows={4}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  linkOfdocs: e.target.value.split(","),
                });
              }}
            />
          </Form.Item>

          <Form.Item<ISubject>
            label="Người tạo"
            name="creator"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, creator: e.target.value });
              }}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
