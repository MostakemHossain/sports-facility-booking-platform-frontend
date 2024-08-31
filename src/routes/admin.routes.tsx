import MyProfile from "../pages/MyProfile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllBookings from "../pages/admin/AllBookings";
import AllEmployees from "../pages/admin/AllEmployees";
import ContactInfo from "../pages/admin/ContactInfo";
import CreateFacility from "../pages/admin/CreateFacility";
import Employee from "../pages/admin/Employee";
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
    name: "All Bookings",
    path: "all-bookings",
    element: <AllBookings />,
  },
  {
    name: "Create Employees",
    path: "create-employee",
    element: <Employee />,
  },

  {
    name: "Manage Employee",
    path: "employees",
    element: <AllEmployees />,
  },

  {
    name: "Users",
    path: "users",
    element: <Users />,
  },
  {
    name: "Contacts",
    path: "contact",
    element: <ContactInfo />,
  },
  {
    name: "Profile",
    path: "me",
    element: <MyProfile />,
  },
];
