import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<div>home</div>} />
        <Route path="/vehicle/:id" element={<div>Edit</div>} />
      </Routes>
    </Router>
  );
}

export default App;
