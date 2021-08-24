import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register, Authentication } from './components';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/*" element={<Navigate to="login" />} />
    </Routes>
  );
};

export default App;
