import { Calendar, Card, Col, Row, Statistic, Table } from "antd";
import "antd/dist/reset.css";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const roleData = [
  { key: 1, role: "User" },
  { key: 2, role: "Admin" },
  { key: 3, role: "SuperAdmin" },
];

const columns = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (text: string) => {
      let color;
      switch (text) {
        case "User":
          color = "#f56a00";
          break;
        case "Admin":
          color = "#00a854";
          break;
        case "SuperAdmin":
          color = "#108ee9";
          break;
        default:
          color = "#000";
      }
      return <span style={{ color: color, fontWeight: "bold" }}>{text}</span>;
    },
  },
];

const purchaseData = [
  { name: "Jan", total: 20 },
  { name: "Feb", total: 50 },
  { name: "Mar", total: 30 },
  { name: "Apr", total: 60 },
  { name: "May", total: 40 },
  { name: "Jun", total: 70 },
];

const temperatureData = [
  { day: "Mon", temperature: 22 },
  { day: "Tue", temperature: 24 },
  { day: "Wed", temperature: 26 },
  { day: "Thu", temperature: 25 },
  { day: "Fri", temperature: 27 },
  { day: "Sat", temperature: 23 },
  { day: "Sun", temperature: 24 },
];

const userStats = {
  totalPurchases: 350,
  totalFacilitiesBooked: 120,
  upcomingBookings: 5,
  userName: "John Doe",
};

const titleColors = {
  totalPurchases: "#f56a00",
  totalFacilitiesBooked: "#00a854",
  upcomingBookings: "#108ee9",
  rolesInWebsite: "#ff4d4f",
  monthlyPurchases: "#2db7f5",
  temperatureTrend: "#a0d911",
};

const UserDashboard = () => {
  const user = useAppSelector(useCurrentUser);

  return (
    <div>
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col>
          <h2
            style={{
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Welcome, <span className="text-orange-600">{user?.name}!</span>
          </h2>
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            Here's a quick overview of your activity on the sports facility
            platform.
          </p>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title={
                <span style={{ color: titleColors.totalPurchases }}>
                  Total Purchases
                </span>
              }
              value={userStats.totalPurchases}
              formatter={(value) => (
                <span className="text-orange-600 font-bold">${value}</span>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title={
                <span style={{ color: titleColors.totalFacilitiesBooked }}>
                  Total Facilities Booked
                </span>
              }
              value={userStats.totalFacilitiesBooked}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title={
                <span style={{ color: titleColors.upcomingBookings }}>
                  Upcoming Bookings
                </span>
              }
              value={userStats.upcomingBookings}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <span style={{ color: titleColors.rolesInWebsite }}>
                Roles in Website
              </span>
            }
            bordered={false}
          >
            <Table columns={columns} dataSource={roleData} pagination={false} />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={16}>
          <Card
            title={
              <span style={{ color: titleColors.monthlyPurchases }}>
                Monthly Purchases Overview
              </span>
            }
            bordered={false}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={purchaseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col xs={24} sm={24} md={24}>
          <Card
            title={
              <span style={{ color: titleColors.temperatureTrend }}>
                Weekly Temperature Trend & Calendar
              </span>
            }
            bordered={false}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Col>

              <Col xs={24} sm={12}>
                <Calendar fullscreen={false} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
