import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [form, setForm] = useState({
    Email: '',
    Password: '',
  });

  const [errors, setErrors] = useState({
    Email: '',
    Password: '',
  });

  const navigate = useNavigate();

  // Function to validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate Email
    if (!form.Email.trim()) {
      newErrors.Email = 'Email is required';
      isValid = false;
    } else {
      newErrors.Email = '';
    }

    // Validate Password
    if (!form.Password.trim()) {
      newErrors.Password = 'Password is required';
      isValid = false;
    } else {
      newErrors.Password = '';
    }

    // Update errors state
    setErrors(newErrors);
    return isValid;
  };

  // Function to handle form submission
  const capValue = async () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post('http://localhost:3000/userserver/login', form);
      if (response.data.token) {
        sessionStorage.setItem('logintoken', response.data.token);

        // Decode the token to check if the user is an admin
        const decodedToken = jwtDecode(response.data.token);
        sessionStorage.setItem('isAdmin', decodedToken.isAdmin);

        
        navigate('/Home');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert('Invalid Login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center flex-grow-1 lform vh-100'>
      <h2>Employee Database Login</h2>

      {/* Email Field */}
      <div>
        <TextField
          name='Email'
          type='email'
          placeholder='Email'
          variant='outlined'
          className='mt-3'
          value={form.Email}
          onChange={(e) => setForm({ ...form, Email: e.target.value })}
          error={!!errors.Email}
          helperText={errors.Email}
        />
      </div>

      {/* Password Field */}
      <div>
        <TextField
          name='Password'
          type='password'
          placeholder='Password'
          variant='outlined'
          className='mt-3'
          value={form.Password}
          onChange={(e) => setForm({ ...form, Password: e.target.value })}
          error={!!errors.Password}
          helperText={errors.Password}
        />
      </div>

      {/* Login Button */}
      <Button
        type='button'
        variant='contained'
        color='primary'
        className='mt-2'
        style={{ width: '225px' }}
        onClick={capValue}
      >
        LogIn
      </Button>

      {/* Credentials Hint */}
      <h6>
        Admin Credentials: Anup,123 <br />
        User Credentials: jithul,123
      </h6>
    </div>
  );
};

export default Login;