import { Button, DatePicker, Form, Input, Modal, Select, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { OpenType } from "./ObdDashboard";

import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { addObd, getObdById, updateObd } from "src/api/Obd.api";
import { showNotification } from "src/components/Notification/Notification";
import { IObd } from "src/types/Obd.type";

interface Props {
  open: OpenType;
  setOpen: React.Dispatch<React.SetStateAction<OpenType>>;
  handleInvalidate: () => void;
}

const initialFormState: IObd = {
  _id: "",
  title: "",
  description: "",
  createDate: new Date(),
  status: "",
  doneDate: null,
};

export default function AddObdDashboard({
  open,
  setOpen,
  handleInvalidate,
}: Props) {
  const [form] = useForm();
  const [formState, setFormState] = useState<IObd>(initialFormState);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addModelMutation = useMutation({
    mutationFn: (data: IObd) => addObd(data),
    onMutate: async () => {
      setConfirmLoading(true);
    },
    onError: (error) => {
      showNotification(error, "error");
      setConfirmLoading(false);
      setFormState(initialFormState);
    },
    onSuccess: () => {
      showNotification("Thêm lỗi thành công", "success");
      setConfirmLoading(false);
    },
  });

  const isEdit = Boolean(open.id);

  const updateModelMutation = useMutation({
    mutationFn: (data: IObd) => updateObd(data),
    onMutate: async () => {
      setConfirmLoading(true);
    },
    onError: (error) => {
      showNotification(error, "error");
      setConfirmLoading(false);
      setFormState(initialFormState);
    },
    onSuccess: () => {
      showNotification("Cập nhật lỗi thành công", "success");
      setConfirmLoading(false);
    },
  });

  const obdByIdQuery = useQuery({
    queryKey: ["ObdById", open.id],
    queryFn: () => {
      if (open.id) {
        return getObdById(open.id);
      }
    },
    enabled: !!open.id,
  });
  useEffect(() => {
    if (obdByIdQuery.isSuccess) {
      setFormState({ ...formState, ...obdByIdQuery.data });
    }
  }, [obdByIdQuery.data, obdByIdQuery.isSuccess]);

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
      {obdByIdQuery.isFetching && isEdit ? (
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
            { name: ["createDate"], value: dayjs(formState.createDate) },
            { name: ["status"], value: formState.status },
            {
              name: ["doneDate"],
              value: formState.doneDate ? dayjs(formState.doneDate) : null,
            },
          ]}
        >
          <Form.Item<IObd>
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

          <Form.Item<IObd>
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

          <Form.Item<IObd>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Hãy nhập loại mô hình!" }]}
          >
            <Select
              onChange={(value) => {
                setFormState({ ...formState, status: value });
              }}
            >
              <Select.Option value="Done">Đã xử lý</Select.Option>
              <Select.Option value="Pending">Chưa xử lý</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<IObd> label="Ngày nhận lỗi" name="createDate">
            <DatePicker
              onChange={(date) => {
                setFormState({
                  ...formState,
                  createDate: date.toDate(),
                });
              }}
            />
          </Form.Item>

          <Form.Item<IObd>
            label="Ngày sửa lỗi"
            name="doneDate"
            rules={[{ message: "Hãy nhập ngày bảo dưỡng!" }]}
          >
            <DatePicker
              onChange={(date) => {
                setFormState({
                  ...formState,
                  doneDate: date.toDate(),
                });
              }}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
