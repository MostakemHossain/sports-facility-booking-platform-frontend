import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;
  let sidebarItems;
  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, "admin");
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, "user");
      break;
    default:
      break;
  }

  return (
    <div>
      <Sider style={{ height: "100%" }} breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 32,
            margin: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            padding: "16px",
          }}
        >
          <Link to={"/"}>
            <h1 className="text-2xl">
              Sport <span className="text-[#EA580B]">Ease</span>
            </h1>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sidebarItems}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
