// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUpPage from './SignUpPage';
import Header from './Header';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/header" element={<Header/>} />

      </Routes>
    </Router>
  );
};

export default App;
