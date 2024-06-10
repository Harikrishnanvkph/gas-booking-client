import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import ServiceCategory from './Logged-In/ServiceCategory';
import Register from './Register';
import ValidatePage from './ValidatePage';
import ForgotPage from './ForgotPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/Info/*" element={<ServiceCategory />} />
        <Route path="/validate" element={<ValidatePage />} />
        <Route path="/forgot" element={<ForgotPage />} />
      </Routes>
    </>
  );
}

export default App;
