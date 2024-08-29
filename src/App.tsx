import MainLayout from "./components/Layout/MainLayout";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import "aos/dist/aos.css";
import AOS from "aos";
import React from "react";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
};

export default App;
