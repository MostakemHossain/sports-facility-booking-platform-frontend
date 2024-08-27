import type { TableColumnsType, TableProps } from "antd";
import {
  Button,
  Col,
  Image,
  Input,
  Row,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useGetAllFacilityQuery } from "../../redux/features/admin/facility/facilityApi";

const { Search } = Input;

interface FacilityData {
  _id: string;
  name: string;
  description: string;
  photo: string;
  location: string;
  pricePerHour: number;
}

interface DataType extends FacilityData {
  key: React.Key;
}

const Facility = () => {
  const { data: facilityData, isLoading } = useGetAllFacilityQuery("");
  const [searchText, setSearchText] = useState<string>("");

  if (isLoading) {
    return <Skeleton avatar paragraph={{ rows: 8 }} />;
  }

  // Type-safe mapping and filtering of facility data
  const tableData: DataType[] | undefined = facilityData?.data
    ?.map(
      ({
        _id,
        name,
        description,
        photo,
        location,
        pricePerHour,
      }: FacilityData) => ({
        key: _id,
        _id,
        name,
        description,
        photo,
        location,
        pricePerHour,
      })
    )
    .filter(({ name, location, pricePerHour }: DataType) => {
      const searchLower = searchText.toLowerCase();
      return (
        name.toLowerCase().includes(searchLower) ||
        location.toLowerCase().includes(searchLower) ||
        pricePerHour.toString().includes(searchText)
      );
    });

  const handleUpdate = (id: string): void => {
    // Implement the update logic here
    console.log("Update facility with ID:", id);
  };

  const handleDelete = (id: string): void => {
    // Implement the delete logic here
    console.log("Delete facility with ID:", id);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Photo",
      dataIndex: "photo",
      render: (photo: string) => (
        <Image
          src={photo}
          alt="Facility Photo"
          width={100}
          height={75}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => (
        <Typography.Text strong>{name}</Typography.Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Price Per Hour",
      dataIndex: "pricePerHour",
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id: string) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<FiEdit />}
            onClick={() => handleUpdate(_id)}
          ></Button>
          <Button
            type="default"
            danger
            icon={<FiTrash />}
            onClick={() => handleDelete(_id)}
          ></Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // Implement change handling logic if needed
  };

  const handleSearch = (value: string): void => {
    setSearchText(value);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Search
            placeholder="Search by name, location, or price"
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default Facility;
