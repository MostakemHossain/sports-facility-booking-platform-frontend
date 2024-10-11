/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Button,
  Col,
  Image,
  Row,
  Skeleton,
  Table,
  Typography,
  message,
} from "antd";
import { useGetUserBookingQuery } from "../../redux/features/admin/booking/booking.Api";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreteOrderMutation } from "../../redux/features/order/order.api";
import { useAppSelector } from "../../redux/hooks";

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
  const user = useAppSelector(useCurrentUser);
  const [createOrder] = useCreteOrderMutation();
  const { data, isLoading } = useGetUserBookingQuery("");

  const bookingsCount = data?.data?.length || 0;

  const handlePayment = async (record: Booking) => {
    try {
      const orderData = {
        user: {
          email: user?.email,
          name: user?.name,
        },
        productId: record._id,
        totalPrice: record.payableAmount,
      };

      const response = await createOrder(orderData).unwrap();

      if (response?.data?.payment_url) {
        window.location.href = response?.data?.payment_url;
      }
    } catch (error) {
      message.error("Failed to create the order. Please try again.");
      console.error("Order creation error:", error);
    }
  };

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
    {
      title: "Payment",
      dataIndex: "isBooked",
      render: (_: any, record: Booking) => (
        <Button
          type={record.isBooked === "pending" ? "default" : "primary"}
          disabled={record.isBooked !== "pending"} 
          style={{
            backgroundColor:
              record.isBooked === "pending" ? "#f0ad4e" : "#52c41a",
            borderColor: record.isBooked === "pending" ? "#f0ad4e" : "#52c41a",
            color: record.isBooked === "pending" ? "#fff" : "",
          }}
          onClick={() => record.isBooked === "pending" && handlePayment(record)} // 
        >
          {record.isBooked === "pending" ? "Make Payment" : "Payment Completed"}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Typography.Title level={4}>My Bookings</Typography.Title>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "right" }}>
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
        scroll={{ x: 768 }} 
      />
    </div>
  );
};

export default MyBookings;
