import { Badge, Col, Image, Row, Skeleton, Table, Typography } from "antd";
import { useGetAllBookingQuery } from "../../redux/features/admin/booking/booking.Api";

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

const AllBookings = () => {
  const { data, isLoading } = useGetAllBookingQuery("");

  const bookingsCount = data?.data?.length || 0;

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
      title: "Title",
      dataIndex: ["facility", "name"],
      sorter: (a: Booking, b: Booking) =>
        a.facility.name.localeCompare(b.facility.name),
      render: (name: string) => (
        <Typography.Text strong>{name}</Typography.Text>
      ),
    },
    {
      title: "User",
      dataIndex: ["user", "email"],
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
      render: (price: number) => `$${price?.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      render: (status: string) => {
        let color: "success" | "warning" | "danger" | undefined;
        if (status === "confirmed") {
          color = "success";
        } else if (status === "pending") {
          color = "danger";
        } else {
          color = "warning";
        }
        return (
          <Typography.Text type={color} strong>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography.Text>
        );
      },
    },
  ];

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Typography.Title level={4}>All Bookings</Typography.Title>
        </Col>
        <Col>
          <Badge count={bookingsCount} style={{ backgroundColor: "#52c41a" }}>
            <Typography.Text>Bookings</Typography.Text>
          </Badge>
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

export default AllBookings;
