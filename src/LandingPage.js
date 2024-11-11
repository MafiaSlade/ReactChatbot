// src/components/LandingPage.js
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login'); // Navigates to the sign-in page
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to Chatbot</h1>
        <p>Your AI-powered chatbot assistant</p>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartClick}
          className="start-button"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
