import { Calendar, Card, Col, Row, Statistic, Table } from "antd";
import "antd/dist/reset.css";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
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

const userData = [
  { key: 1, name: "Alice Johnson", email: "alice@example.com" },
  { key: 2, name: "Bob Smith", email: "bob@example.com" },
  { key: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { key: 4, name: "David Wilson", email: "david@example.com" },
];

const revenueData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 1800 },
  { name: "Mar", revenue: 1500 },
  { name: "Apr", revenue: 2000 },
  { name: "May", revenue: 2500 },
  { name: "Jun", revenue: 3000 },
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

const registeredUsersOverview = [
  { name: "Jan", value: 15 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 10 },
  { name: "Apr", value: 20 },
];

const AdminDashboard = () => {
  const user = useAppSelector(useCurrentUser);
  const totalUsers = 200;
  const totalRevenue = 10000;
  const totalFacilities = 50;
  const totalRegisteredUsers = userData.length;

  return (
    <div>
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col>
          <h2
            style={{
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "bold",
              color: "#1890ff",
            }}
          >
            Welcome, <span className="text-red-600">{user?.name}!</span>
          </h2>
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            Here's a quick overview of your activity on the platform.
          </p>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
            <Statistic
              title={<span style={{ color: "#00a854" }}>Total Users</span>}
              value={totalUsers}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ backgroundColor: "#fff7e6" }}>
            <Statistic
              title={<span style={{ color: "#108ee9" }}>Total Revenue</span>}
              value={totalRevenue}
              formatter={(value) => <span>${value}</span>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ backgroundColor: "#fffbe6" }}>
            <Statistic
              title={<span style={{ color: "#f56a00" }}>Total Facilities</span>}
              value={totalFacilities}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ backgroundColor: "#f0f5ff" }}>
            <Statistic
              title={
                <span style={{ color: "#ff4d4f" }}>Total Registered Users</span>
              }
              value={totalRegisteredUsers}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={8}>
          <Card
            title={<span style={{ color: "#ff4d4f" }}>Roles in Website</span>}
            bordered={false}
          >
            <Table
              columns={[
                {
                  title: "Role",
                  dataIndex: "role",
                  key: "role",
                  render: (text) => {
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
                    return (
                      <span style={{ color: color, fontWeight: "bold" }}>
                        {text}
                      </span>
                    );
                  },
                },
              ]}
              dataSource={roleData}
              pagination={false}
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={16}>
          <Card
            title={
              <span style={{ color: "#ff4d4f" }}>Monthly Revenue Overview</span>
            }
            bordered={false}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="revenue" fill="#8c4dff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col xs={24} sm={24} md={12}>
          <Card
            title={
              <span style={{ color: "#ff4d4f" }}>Weekly Temperature Trend</span>
            }
            bordered={false}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Card
            title={
              <span style={{ color: "#ff4d4f" }}>Last 4 Registered Users</span>
            }
            bordered={false}
          >
            <Table
              columns={[
                { title: "Name", dataIndex: "name", key: "name" },
                { title: "Email", dataIndex: "email", key: "email" },
              ]}
              dataSource={userData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col xs={24} sm={24} md={16}>
          <Card
            title={
              <span style={{ color: "#ff4d4f" }}>
                Last 4 Months Registered Users Overview
              </span>
            }
            bordered={false}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Pie
                  data={registeredUsersOverview}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  <Cell fill="#0088FE" />
                  <Cell fill="#00C49F" />
                  <Cell fill="#FFBB28" />
                  <Cell fill="#FF8042" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Card
            title={<span style={{ color: "#ff4d4f" }}>Calendar</span>}
            bordered={false}
          >
            <Calendar fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
