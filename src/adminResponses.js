// EmailVerification.js
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const EmailVerification = ({ onVerify }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const specificEmail = 'selvarasan2004@gmail.com'; // Set your email here

  const handleVerification = () => {
    if (email === specificEmail) {
      onVerify(email); // Call the parent function to handle successful verification
      setError('');
    } else {
      setError('Email not recognized. Please use the registered email.');
    }
  };

  return (
    <div>
      <Typography variant="h6">Email Verification</Typography>
      <TextField
        label="Enter your email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        style={{ marginBottom: '16px' }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={handleVerification}>
        Verify
      </Button>
    </div>
  );
};

export default EmailVerification;
