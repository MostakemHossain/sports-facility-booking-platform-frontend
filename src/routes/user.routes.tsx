import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import CreateBooking from "../pages/user/CreateBooking";
import UserDashboard from "../pages/user/UserDashboard";
export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
};

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

export const userRoutes = userPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  return acc;
}, []);

export const userSidebarItems = userPaths.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/user/${item.path}`}>{item.name}</NavLink>,
      });
    }
    return acc;
  },
  []
);
