import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivationPage from "./pages/ActivationPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layouts/AuthLayout";
import VehiclesPage from "./pages/VehiclesPage";
import MainLayout from "./layouts/MainLayout";
import VehiclePage from "./pages/VehiclePage";
import VehicleEditPage from "./pages/VehicleEditPage";
import AddVehiclePage from "./pages/AddVehiclePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/activate" element={<ActivationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<VehiclesPage />} />
          <Route path="/add-vehicle" element={<AddVehiclePage />} />
          <Route path="/vehicles/:id" element={<VehiclePage />} />
          <Route path="/vehicles/:id/edit" element={<VehicleEditPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
