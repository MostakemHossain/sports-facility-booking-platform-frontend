import CreateBooking from "../pages/user/CreateBooking";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Create Booking",
    path: "create-booking",
    element: <CreateBooking />,
  },
];
