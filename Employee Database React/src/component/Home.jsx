import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid,} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';



const Home = () => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; // Check if the user is an admin

  useEffect(() => {
    axios
      .get('http://localhost:3000/server/')
      .then((res) => {
        setCardData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  function updateData(val) {
    navigate('/addemployee', { state: { val } });
  }

  function delete_data(id) {
    axiosInstance.delete(`http://localhost:3000/server/delete/${id}`)
      .then((res) => {
        setCardData(cardData.filter(user => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    

    <div className="mt-5">

      
       <div className="header-content mb-5">
        
        <Typography variant="h5" align="center" sx={{ color: '#666' }}>
          Welcome to the employee management system. Here you can view and manage employee details.
        </Typography>
        <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333', marginTop: '20px' }}>
        You are logged in as {isAdmin ? 'Admin' : 'User'}.
        </Typography>
      </div>

      <Grid container spacing={4}>
        
        {cardData.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
            <Card sx={{ minWidth: 250, maxWidth: 300, minHeight: 250, boxShadow: 20 }} className="ms-5">
              <CardContent>
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                  {user.Name}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  ID: {user.ID}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Designation: {user.Designation}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Salary: {user.Salary} $/month
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Department: {user.Department}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Location: {user.Location}
                </Typography>
              </CardContent>
              <CardActions>
                {isAdmin && ( // Only show Update and Delete buttons for admin users
                  <>
                    <Button className='update-button'
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => updateData(user)}
                    >
                      Update
                    </Button>
                    <Button className='delete-button'
                      size="small"
                      color="primary"
                      variant="text"
                      onClick={() => delete_data(user._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
