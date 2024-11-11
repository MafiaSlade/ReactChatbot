import React, { useState } from 'react';
import { Button, TextField, Link, Container, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import MicrosoftIcon from './MicrosoftIcon'; 
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // Tracks if a field has been touched
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSignIn = () => {
    const newErrors = validateForm();
    setTouched({ email: true, password: true }); // Mark all fields as touched

    if (Object.keys(newErrors).length === 0) {
      alert('Sign in successful!');
      navigate('/header');
    } else {
      alert('Please fix the errors in the form');
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please sign in to continue.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className="signup-button"
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </Button>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Email *"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          error={!!errors.email && touched.email}
          helperText={touched.email && errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password *"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          error={!!errors.password && touched.password}
          helperText={touched.password && errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Link href="#" variant="body2" className="forgot-password">
          Forgot password?
        </Link>
        <Button
          variant="contained"
          color="primary"
          className="signin-button"
          fullWidth
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </form>

      <Box mt={2} display="flex" justifyContent="center">
        <IconButton color="secondary" className="google-icon">
          <GoogleIcon />
        </IconButton>
        <IconButton color="primary" className="microsoft-icon">
          <MicrosoftIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Login;
