import MyProfile from "../pages/MyProfile";
import MyBookings from "../pages/user/MyBookings";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My Bookings",
    path: "my-bookings",
    element: <MyBookings />,
  },
  {
    name: "Profile",
    path: "me",
    element: <MyProfile />,
  },
];
