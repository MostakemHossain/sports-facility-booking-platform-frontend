/* eslint-disable react-hooks/rules-of-hooks */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { setLogout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import Sidebar from "./Sidebar";
import { RootState } from "../../redux/store";

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => useCurrentUser(state));
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const menu = (
    <Menu>
      {user && (
        <>
          <Menu.Item key="profile">
            <Link to={`/${user.role}/me`}>My Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button onClick={handleLogout}>Logout</Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh", }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: "#EA580B" }}>
          <div
            className="flex items-center justify-end"
            style={{ padding: "0 16px", marginTop: "10px", }}
          >
            <Dropdown overlay={menu} placement="bottomRight">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src="https://example.com/your-avatar-image.jpg"
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
