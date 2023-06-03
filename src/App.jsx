/*eslint-disable*/
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivationPage from './pages/ActivationPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import VehiclesPage from './pages/VehiclesPage';
import MainLayout from './layouts/MainLayout';
import VehiclePage from './pages/VehiclePage';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import UserContext from './common/context/userContext';
import { observer } from 'mobx-react-lite';

function App() {
  const userStore = useContext(UserContext);

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
          <Route path="/vehicles/:id" element={<VehiclePage />} />
          {userStore.isAdmin && (
            <Route path="/vehicles/:id/edit" element={<VehiclePage />} />
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default observer(App);
