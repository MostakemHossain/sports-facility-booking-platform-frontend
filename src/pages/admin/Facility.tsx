/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
import {
  Button,
  Col,
  Image,
  Input,
  Modal,
  Row,
  Skeleton,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useGetAllFacilityQuery } from "../../redux/features/admin/facility/facilityApi";
import { setFacilities } from "../../redux/features/admin/facility/facilitySlice";
import { useAppDispatch, useDebounced } from "../../redux/hooks";
import DeleteFacility from "./DeleteFacility"; // Import the DeleteFacility component
import UpdateFacility from "./UpdateFacility";

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
  const query: Record<string, any> = {};
  const [searchTerm, setsearchTerm] = useState("");
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data: facilityData, isLoading } = useGetAllFacilityQuery({
    ...query,
  });
  const dispatch = useAppDispatch();
  dispatch(setFacilities(facilityData));
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null
  );
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [selectedFacilityName, setSelectedFacilityName] = useState<string>("");

  if (isLoading) {
    return <Skeleton avatar paragraph={{ rows: 8 }} />;
  }

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
    setSelectedFacilityId(id);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string, name: string): void => {
    setSelectedFacilityId(id);
    setSelectedFacilityName(name);
    setIsDeleteModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedFacilityId(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalVisible(false);
    setSelectedFacilityId(null);
    setSelectedFacilityName("");
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
      render: (_id: string, record: DataType) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<FiEdit />}
            onClick={() => handleUpdate(_id)}
          />
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
        <Col xs={24} sm={12} md={8} lg={6}>
          <Search
            placeholder="Search by name, location, or price"
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setsearchTerm(e.target.value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: 768 }}
        />
      </div>

      <Modal visible={isModalVisible} onCancel={handleModalClose} footer={null}>
        <UpdateFacility id={selectedFacilityId} onClose={handleModalClose} />
      </Modal>

      <DeleteFacility
        visible={isDeleteModalVisible}
        onClose={handleDeleteModalClose}
        facilityName={selectedFacilityName}
        id={selectedFacilityId || ""}
      />
    </div>
  );
};

export default Facility;
