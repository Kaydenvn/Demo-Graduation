import { Button, Form, Input, Modal, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { OpenType } from "./SubjectDashboard";

import { useMutation, useQuery } from "@tanstack/react-query";
import TextArea from "antd/es/input/TextArea";
import { addSubject, getSubjectById, updateSubject } from "src/api/Subject.api";
import { showNotification } from "src/components/Notification/Notification";
import useAuth from "src/hooks/useAuth";
import { ISubject } from "src/types/Subject.type";

interface Props {
  open: OpenType;
  setOpen: React.Dispatch<React.SetStateAction<OpenType>>;
  handleInvalidate: () => void;
}

export default function AddSubjectDashboard({
  open,
  setOpen,
  handleInvalidate,
}: Props) {
  const { user } = useAuth();
  const initialFormState: ISubject = {
    _id: "",
    title: "",
    description: "",
    nameOfdocs: [],
    linkOfdocs: [],
    creator: user?._id || "",
    photo: "",
  };
  const [form] = useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formState, setFormState] = useState<ISubject>(initialFormState);

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

  const subjectbyIdQuery = useQuery({
    queryKey: ["subjectById", open.id],
    queryFn: () => {
      if (open.id) {
        return getSubjectById(open.id);
      }
    },
    enabled: !!open.id,
  });
  useEffect(() => {
    if (subjectbyIdQuery.isSuccess) {
      setFormState(subjectbyIdQuery.data);
    }
  }, [subjectbyIdQuery.data, subjectbyIdQuery.isSuccess]);

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
              setFormState(initialFormState);
              setConfirmLoading(false);
              setOpen({ isOpen: false });
            },
          });
        } else {
          addSubjectMutation.mutate(formState, {
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
      {subjectbyIdQuery.isFetching && isEdit ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <Form
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 22, offset: 1 }}
          form={form}
          layout="vertical"
          fields={[
            { name: ["title"], value: formState.title },
            { name: ["description"], value: formState.description },
            { name: ["nameOfdocs"], value: formState.nameOfdocs },
            { name: ["linkOfdocs"], value: formState.linkOfdocs },
            { name: ["creator"], value: formState.creator },
            { name: ["photo"], value: formState.photo },
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
            label="Tên tài liệu (mỗi tài liệu xuống dòng, thêm dấu phẩy ở cuối)"
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
            label="Link tài liệu (mỗi tài liệu xuống dòng, thêm dấu phẩy ở cuối)"
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
            rules={[{ required: true, message: "Please input your creator!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, creator: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item<ISubject>
            label="Ảnh môn học (Link)"
            name="photo"
            rules={[{ required: true, message: "Please input your photo!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, photo: e.target.value });
              }}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
