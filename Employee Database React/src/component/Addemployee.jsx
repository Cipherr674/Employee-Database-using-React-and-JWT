import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import axiosInstance from '../axiosInterceptor';

const Addemployee = () => {
  const location = useLocation(); // Used for the update function
  const navigate = useNavigate();

  // State for form data
  const [form1, setForm1] = useState({
    Name: '',
    ID: '',
    Designation: '',
    Salary: '',
    Department: '',
    Location: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({
    Name: '',
    ID: '',
    Designation: '',
    Salary: '',
    Department: '',
    Location: '',
  });

  // Function to validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    
    if (!form1.Name.trim()) {
      newErrors.Name = 'Name is required';
      isValid = false;
    } else {
      newErrors.Name = '';
    }

    
    if (!form1.ID.trim()) {
      newErrors.ID = 'ID is required';
      isValid = false;
    } else {
      newErrors.ID = '';
    }

   
    if (!form1.Designation.trim()) {
      newErrors.Designation = 'Designation is required';
      isValid = false;
    } else {
      newErrors.Designation = '';
    }

   
    if (!form1.Salary.trim()) {
      newErrors.Salary = 'Salary is required';
      isValid = false;
    } else if (isNaN(form1.Salary)) {
      newErrors.Salary = 'Salary must be a number';
      isValid = false;
    } else {
      newErrors.Salary = '';
    }

  
    if (!form1.Department.trim()) {
      newErrors.Department = 'Department is required';
      isValid = false;
    } else {
      newErrors.Department = '';
    }

    
    if (!form1.Location.trim()) {
      newErrors.Location = 'Location is required';
      isValid = false;
    } else {
      newErrors.Location = '';
    }

    
    setErrors(newErrors);
    return isValid;
  };

  // Function to handle form submission
  const capValue = async () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      if (location.state != null) {
        // Update existing employee
        await axiosInstance.put(
          `http://localhost:3000/server/edit/${location.state.val._id}`,
          form1
        );
      } else {
        // Add new employee
        await axiosInstance.post('http://localhost:3000/server/add', form1);
      }
      navigate('/Home');
    } catch (error) {
      alert('Error submitting form');
      console.error('Error:', error);
    }
  };

  // Pre-fill form if in edit mode
  useEffect(() => {
    if (location.state != null) {
      setForm1({
        ...form1,
        Name: location.state.val.Name,
        ID: location.state.val.ID,
        Designation: location.state.val.Designation,
        Salary: location.state.val.Salary,
        Department: location.state.val.Department,
        Location: location.state.val.Location,
      });
    } else {
      setForm1({
        ...form1,
        Name: '',
        ID: '',
        Designation: '',
        Salary: '',
        Department: '',
        Location: '',
      });
    }
  }, [location.state]);

  return (
    <div>
      <div className='container d-flex flex-column justify-content-center align-items-center flex-grow-1 lform vh-100'>
        <h3>Add Employee</h3>
        <Grid container spacing={1}>
          {/* Name Field */}
          <Grid item xs={6} md={12}>
            <TextField
              fullWidth
              variant='outlined'
              value={form1.Name}
              label='Name'
              type='text'
              name='Name'
              onChange={(e) => setForm1({ ...form1, Name: e.target.value })}
              error={!!errors.Name}
              helperText={errors.Name}
            />
          </Grid>

          {/* ID Field */}
          <Grid item xs={6} md={12}>
            <TextField
              fullWidth
              variant='outlined'
              value={form1.ID}
              label='ID'
              type='text'
              name='ID'
              onChange={(e) => setForm1({ ...form1, ID: e.target.value })}
              error={!!errors.ID}
              helperText={errors.ID}
            />
          </Grid>

          {/* Designation Field */}
          <Grid item xs={6} md={12}>
            <TextField
              fullWidth
              variant='outlined'
              value={form1.Designation}
              label='Designation'
              type='text'
              name='Designation'
              onChange={(e) => setForm1({ ...form1, Designation: e.target.value })}
              error={!!errors.Designation}
              helperText={errors.Designation}
            />
          </Grid>

          {/* Salary Field */}
          <Grid item xs={6} md={12}>
            <TextField
              fullWidth
              variant='outlined'
              value={form1.Salary}
              label='Salary'
              type='text'
              name='Salary'
              onChange={(e) => setForm1({ ...form1, Salary: e.target.value })}
              error={!!errors.Salary}
              helperText={errors.Salary}
            />
          </Grid>

          {/* Department Field */}
          <Grid item xs={6} md={12}>
            <TextField
              fullWidth
              variant='outlined'
              value={form1.Department}
              label='Department'
              type='text'
              name='Department'
              onChange={(e) => setForm1({ ...form1, Department: e.target.value })}
              error={!!errors.Department}
              helperText={errors.Department}
            />
          </Grid>

          {/* Location Field */}
          <Grid item xs={6} md={12}>
            <TextField
              fullWidth
              variant='outlined'
              value={form1.Location}
              label='Location'
              type='text'
              name='Location'
              onChange={(e) => setForm1({ ...form1, Location: e.target.value })}
              error={!!errors.Location}
              helperText={errors.Location}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button
          type='button'
          variant='contained'
          color='primary'
          className='mt-1'
          style={{ width: '200px' }}
          onClick={capValue}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Addemployee;