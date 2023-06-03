/*eslint-disable*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivationPage from './pages/ActivationPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import VehiclesPage from './pages/VehiclesPage';
import MainLayout from './layouts/MainLayout';

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
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<div>Edit</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
