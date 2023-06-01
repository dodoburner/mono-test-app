/*eslint-disable*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivationPage from './pages/ActivationPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/activate" element={<ActivationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/vehicle/:id" element={<div>Edit</div>} />
      </Routes>
    </Router>
  );
}

export default App;
