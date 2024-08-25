import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./admin.routes";
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
    path: "/admin",
    element: <App />,
    children: adminRoutes,
  },
  {
    path: "/user",
    element: <App />,
    children: userPaths,
  },
]);
export default router;
