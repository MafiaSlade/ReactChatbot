// ChatbotPage.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import EmailVerification from './EmailVerification'; // Import the verification component

const ChatbotPage = () => {
  const [userMessage, setUserMessage] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUserMessage(value);

    // Check if the user typed "admin"
    if (value.toLowerCase() === 'admin') {
      setShowVerification(true); // Show verification component
      setUserMessage(''); // Clear the input
    }
  };

  const handleVerificationComplete = () => {
    setShowVerification(false); // Hide the verification component after successful verification
    // You can add additional logic here if needed (e.g., show video buttons)
  };

  return (
    <div>
      <TextField
        value={userMessage}
        onChange={handleInputChange}
        placeholder="Type your message..."
        variant="outlined"
        fullWidth
      />
      {showVerification && (
        <EmailVerification onVerify={handleVerificationComplete} />
      )}
      {/* Add your chatbox or other components here */}
    </div>
  );
};

export default ChatbotPage;
