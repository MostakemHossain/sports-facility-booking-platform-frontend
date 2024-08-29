import { Col, Image, Row, Skeleton, Table, Typography } from "antd";
import { useGetUserBookingQuery } from "../../redux/features/admin/booking/booking.Api";

interface Facility {
  name: string;
  description: string;
  location: string;
  pricePerHour: number;
  photo: string;
}

interface Booking {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  facility: Facility;
  payableAmount: number;
  isBooked: string;
}

const MyBookings = () => {
  const { data, isLoading } = useGetUserBookingQuery("");

  const columns = [
    {
      title: "Photo",
      dataIndex: ["facility", "photo"],
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
      dataIndex: ["facility", "name"],
      sorter: (a: Booking, b: Booking) =>
        a.facility.name.localeCompare(b.facility.name),
      render: (name: string) => (
        <Typography.Text strong>{name}</Typography.Text>
      ),
    },
    {
      title: "Description",
      dataIndex: ["facility", "description"],
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: ["facility", "location"],
      sorter: (a: Booking, b: Booking) =>
        a.facility.location.localeCompare(b.facility.location),
    },
    {
      title: "Price Per Hour",
      dataIndex: ["facility", "pricePerHour"],
      sorter: (a: Booking, b: Booking) =>
        a.facility.pricePerHour - b.facility.pricePerHour,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      render: (status: string) => (
        <Typography.Text
          type={status === "confirmed" ? "success" : "warning"}
          strong
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Typography.Text>
      ),
    },
  ];

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Typography.Title level={4}>My Bookings</Typography.Title>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        bordered
      />
    </div>
  );
};

export default MyBookings;
