import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Popconfirm, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Fragment, useState } from "react";
import { deleteSubject, getAllSubjects } from "src/api/Subject.api";
import { showNotification } from "src/components/Notification/Notification";
import Text from "src/components/Text";
import { ISubject } from "src/types/Subject.type";
import AddAsset from "./AddSubjectDashboard";

// user value column of antd table
const columns = function (
  isUpdate: boolean,
  isDelete: boolean,
  callbackEdit: (id: string) => void,
  callbackDelete: (id: string) => void
): ColumnsType<ISubject> {
  const columnTitle: ColumnsType<ISubject> = [
    {
      title: "Tên môn học",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "20%",
    },
    {
      title: "Tên tài liệu",
      dataIndex: "nameOfdocs",
      key: "nameOfdocs",
      render: (_: string, record: ISubject) => (
        // let every item break line
        <Text>
          {record.nameOfdocs.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Text>
      ),
    },
    {
      title: "Link tài liệu",
      dataIndex: "linkOfdocs",
      key: "linkOfdocs",
      render: (_: string, record: ISubject) => (
        // let every item break line
        <Text>
          {record.linkOfdocs.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Text>
      ),
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      width: "10%",
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 100,
      render: (_: string, record: ISubject) => (
        <Space size="small">
          {isUpdate && (
            <Button type="link" onClick={() => callbackEdit(record._id)}>
              Sửa
            </Button>
          )}
          {isDelete && (
            <Popconfirm
              title={"Bạn có chắc chắn muốn xoá môn học này không?"}
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

export default function SubjectDashboard() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const clientQuery = useQueryClient();

  const [open, setOpen] = useState<OpenType>({ isOpen: false });

  const deleteSubjectMutation = useMutation({
    mutationFn: (id: string) => deleteSubject(id),

    onError: (error) => {
      showNotification(error, "error");
    },
    onSuccess: () => {
      showNotification("Xoá môn học thành công", "success");
    },
  });

  const subjectsQuery = useQuery({
    queryKey: ["subjectsTable"],
    queryFn: () => getAllSubjects(page, pageSize),
    staleTime: 60 * 1000,
  });

  const handleDelete = (id: string) => {
    deleteSubjectMutation.mutate(id, {
      onSuccess: () => {
        subjectsQuery.refetch();
      },
    });
  };

  const handleEdit = (id: string) => {
    setOpen({ isOpen: true, id: id });
  };

  const handleInvalidate = () => {
    clientQuery.invalidateQueries({
      queryKey: ["subjectsTable"],
    });
  };

  return (
    <Fragment>
      <div className="p-4 sm:ml-64">
        <Text size="lg" className="font-bold">
          Môn học
        </Text>
        <Flex className="mt-4">
          <Button
            onClick={() => setOpen({ isOpen: true })}
            className="bg-soft"
            type="primary"
          >
            Thêm môn học
          </Button>
        </Flex>
        {subjectsQuery.isLoading ? (
          <Skeleton active />
        ) : (
          <Table
            className="mt-4"
            columns={columns(true, true, handleEdit, handleDelete)}
            dataSource={subjectsQuery.data?.data}
            loading={subjectsQuery.isLoading}
            scroll={{ x: "2000px" }}
            pagination={{
              current: page,
              pageSize,
              total: subjectsQuery.data?.total_pages,
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
