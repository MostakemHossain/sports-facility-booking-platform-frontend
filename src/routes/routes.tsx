import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookingPage from "../components/Home/BookingPage";
import Facility from "../components/Home/Facility";
import FacilityDetails from "../components/Home/FacilityDetails";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/facilities",
    element: <Facility />,
  },
  {
    path: "/facility/:id",
    element: <FacilityDetails />,
  },
  {
    path: "/facility/booking/:id",
    element: <BookingPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <App />,
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
]);
export default router;
