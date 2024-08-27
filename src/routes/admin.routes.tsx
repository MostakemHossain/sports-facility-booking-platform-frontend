import MyProfile from "../pages/MyProfile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateFacility from "../pages/admin/CreateFacility";
import Facility from "../pages/admin/Facility";
import Users from "../pages/admin/Users";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Create Facility",
    path: "create-facility",
    element: <CreateFacility />,
  },
  {
    name: "Facility",
    path: "facilities",
    element: <Facility />,
  },
  {
    name: "Users",
    path: "users",
    element: <Users />,
  },
  {
    name: "Profile",
    path: "me",
    element: <MyProfile />,
  },
];
