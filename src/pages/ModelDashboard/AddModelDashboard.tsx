import { Button, DatePicker, Form, Input, Modal, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { OpenType } from "./ModelDashboard";

import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { addModel, getModelById, updateModel } from "src/api/Model.api";
import { showNotification } from "src/components/Notification/Notification";
import { IModel } from "src/types/Model.type";
import TextArea from "antd/es/input/TextArea";

interface Props {
  open: OpenType;
  setOpen: React.Dispatch<React.SetStateAction<OpenType>>;
  handleInvalidate: () => void;
}

const day = dayjs();
const today = day.format("YYYY-MM-DD");

const initialFormState: IModel = {
  _id: "",
  title: "",
  description: "",
  startDate: today,
  modelType: "",
  maintainTime: today,
  photo: [""],
};

export default function AddModelDashboard({
  open,
  setOpen,
  handleInvalidate,
}: Props) {
  const [form] = useForm();
  const [formState, setFormState] = useState<IModel>(initialFormState);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addModelMutation = useMutation({
    mutationFn: (data: IModel) => addModel(data),
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

  const updateModelMutation = useMutation({
    mutationFn: (data: IModel) => updateModel(data),
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

  const modelByIdQuery = useQuery({
    queryKey: ["ModelById", open.id],
    queryFn: () => {
      if (open.id) {
        return getModelById(open.id);
      }
    },
    enabled: !!open.id,
  });
  useEffect(() => {
    if (modelByIdQuery.isSuccess) {
      const editUser = {
        ...modelByIdQuery.data,
        maintainTime: dayjs(modelByIdQuery.data.maintainTime),
        startDate: dayjs(modelByIdQuery.data.startDate),
      };

      setFormState(editUser);
    }
  }, [modelByIdQuery.data, modelByIdQuery.isSuccess]);

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
          updateModelMutation.mutate(formState, {
            onSuccess: () => {
              handleInvalidate();
              setFormState(initialFormState);
              setConfirmLoading(false);
              setOpen({ isOpen: false });
            },
          });
        } else {
          addModelMutation.mutate(formState, {
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
      {modelByIdQuery.isFetching && isEdit ? (
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
            { name: ["modelType"], value: formState.modelType },
            {
              name: ["maintainTime"],
              value: dayjs(formState.maintainTime),
            },
            { name: ["photo"], value: formState.photo.map((item) => item) },
            {
              name: ["startDate"],
              value: dayjs(formState.startDate),
            },
          ]}
        >
          <Form.Item<IModel>
            label="Tên mô hình"
            name="title"
            rules={[{ required: true, message: " Hãy nhập tên mô hình!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, title: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<IModel>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Hãy nhập mô tả mô hình!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, description: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<IModel>
            label="Loại mô hình"
            name="modelType"
            rules={[{ required: true, message: "Hãy nhập loại mô hình!" }]}
          >
            <Input
              onChange={(e) => {
                setFormState({ ...formState, modelType: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item<IModel>
            label="Ngày nhập xưởng"
            name="startDate"
            rules={[{ required: true, message: "Hãy nhập ngày bảo dưỡng!" }]}
          >
            <DatePicker
              onChange={(date) => {
                setFormState({
                  ...formState,
                  startDate: date.format("YYYY-MM-DD"),
                });
                console.log("formState", formState);
              }}
            />
          </Form.Item>

          <Form.Item<IModel>
            label="Ngày bảo dưỡng"
            name="maintainTime"
            rules={[{ required: true, message: "Hãy nhập ngày bảo dưỡng!" }]}
          >
            <DatePicker
              onChange={(date) => {
                setFormState({
                  ...formState,
                  maintainTime: date.format("YYYY-MM-DD"),
                });
              }}
            />
          </Form.Item>

          <Form.Item<IModel>
            label="Ảnh mô hình (Các link cách nhau bởi dấu phẩy (,) )"
            name="photo"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{}}
          >
            <TextArea
              rows={4}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  // return array of photo
                  photo: e.target.value.split(","),
                });
              }}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
