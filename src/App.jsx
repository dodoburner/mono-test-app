/*eslint-disable*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivationPage from './pages/ActivationPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import AuthLayout from './layouts/AuthLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/activate" element={<ActivationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/vehicles" element={<HomePage />} />
        <Route path="/vehicles/:id" element={<div>Edit</div>} />
      </Routes>
    </Router>
  );
}

export default App;
