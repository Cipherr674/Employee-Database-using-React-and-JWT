import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { AppBar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; // check if the user is an admin

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Employee Database
            </Typography>
            <Link to={'/Home'}>
              <Button style={{ color: 'white' }}>Home</Button>
            </Link>
            
            {isAdmin && (
              <Link to={'/addemployee'}>
                <Button style={{ color: 'white' }}>Add Employee</Button>
              </Link>
            )}
            <Link to={'/'}>
              <Button
                style={{ color: 'white' }}
                onClick={() => {
                  sessionStorage.removeItem('logintoken');
                  sessionStorage.removeItem('isAdmin'); // Clear isAdmin on logout
                }}
              >
                Logout
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;