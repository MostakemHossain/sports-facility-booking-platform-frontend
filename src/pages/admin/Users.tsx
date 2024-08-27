import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "../../redux/features/user/userApi";
import { useAppDispatch } from "../../redux/hooks";

const { Search } = Input;
const { Option } = Select;

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "super-admin";
}

interface DataType extends UserData {
  key: React.Key;
}

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const Users = () => {
  const { data: userData, isLoading } = useGetAllUsersQuery("");
  const [updateRole] = useUpdateRoleMutation();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  if (isLoading) {
    return <Skeleton avatar paragraph={{ rows: 8 }} />;
  }

  const tableData: DataType[] | undefined = userData?.data
    ?.map(({ _id, name, email, phone, role }: UserData) => ({
      key: _id,
      _id,
      name,
      email,
      phone,
      role,
    }))
    .filter(({ name, email, phone }: DataType) => {
      const searchLower = searchText.toLowerCase();
      return (
        name.toLowerCase().includes(searchLower) ||
        email.toLowerCase().includes(searchLower) ||
        phone.toLowerCase().includes(searchLower)
      );
    });

  const handleUpdate = (id: string): void => {
    setSelectedUserId(id);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string, name: string): void => {
    setSelectedUserId(id);
    setSelectedUserName(name);
    setIsDeleteModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalVisible(false);
    setSelectedUserId(null);
    setSelectedUserName("");
  };

  const handleRoleChange = async (value: string, id: string) => {
    try {
      const res = await updateRole({ id, data: { role: value } }).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          className: "custom-toast",
        });
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        className: "custom-toast",
      });
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => (
        <Typography.Text strong>{name}</Typography.Text>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string, record: DataType) => (
        <Select
          value={role}
          onChange={(value) => handleRoleChange(value, record._id)}
          style={{ width: 120 }}
        >
          {roleOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id: string, record: DataType) => (
        <Space size="middle">
          <Button
            type="default"
            danger
            icon={<FiTrash />}
            onClick={() => handleDelete(_id, record.name)}
          />
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string): void => {
    setSearchText(value);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Search
            placeholder="Search by name, email, or phone"
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 8 }}
        bordered
      />
    </div>
  );
};

export default Users;
