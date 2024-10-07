/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Skeleton, Space, Table } from "antd";
import React from "react";
import { toast } from "sonner";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeeQuery,
} from "../../redux/features/admin/Employee/employee.api";

interface Employee {
  _id: string;
  name: string;
  designation: string;
  image: string;
  phone: string;
  facebookURL: string;
  linkedinURL: string;
  instrURL: string;
}

const AllEmployees: React.FC = () => {
  const { data, error, isLoading } = useGetAllEmployeeQuery("");
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<
    string | null
  >(null);

  const showModal = (id: string) => {
    setSelectedEmployeeId(id);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedEmployeeId) {
      try {
        const res = await deleteEmployee(selectedEmployeeId).unwrap();

        if (res?.success) {
          toast.success(res?.message, {
            className: "custom-toast",
          });
          setIsModalVisible(false);
        }
      } catch (error: any) {
        toast.error(error.data.message, {
          className: "custom-toast",
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img
          src={text}
          alt="Employee"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Facebook",
      dataIndex: "facebookURL",
      key: "facebookURL",
      render: (text: string) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3b5998" }}
        >
          Facebook
        </a>
      ),
    },
    {
      title: "LinkedIn",
      dataIndex: "linkedinURL",
      key: "linkedinURL",
      render: (text: string) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0077b5" }}
        >
          LinkedIn
        </a>
      ),
    },
    {
      title: "Instagram",
      dataIndex: "instrURL",
      key: "instrURL",
      render: (text: string) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#e1306c" }}
        >
          Instagram
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Employee) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showModal(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Skeleton />;
  if (error) return <Skeleton />;

  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.data}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
    </>
  );
};

export default AllEmployees;
