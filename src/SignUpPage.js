import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, InputAdornment } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon, Person as PersonIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formValues.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formValues.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formValues.phone && !/^\d{10}$/.test(formValues.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSignUp = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      alert('Account created successfully!');
      navigate('/header');
    } else {
      alert('Please fix the errors in the form');
    }
  };

  return (
    <Container maxWidth="xs" className="signup-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Your Account
      </Typography>
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Full Name *"
          variant="outlined"
          margin="normal"
          fullWidth
          value={formValues.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          onBlur={() => setTouched({ ...touched, fullName: true })}
          error={!!errors.fullName && touched.fullName}
          helperText={touched.fullName && errors.fullName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email *"
          variant="outlined"
          margin="normal"
          fullWidth
          value={formValues.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => setTouched({ ...touched, email: true })}
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
          value={formValues.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          onBlur={() => setTouched({ ...touched, password: true })}
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
        <TextField
          label="Confirm Password *"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={formValues.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          onBlur={() => setTouched({ ...touched, confirmPassword: true })}
          error={!!errors.confirmPassword && touched.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={formValues.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          onBlur={() => setTouched({ ...touched, phone: true })}
          error={!!errors.phone && touched.phone}
          helperText={touched.phone && errors.phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="signup-button"
          fullWidth
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUpPage;
