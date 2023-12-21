import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import {Button,Grid,Typography,Paper,Tabs, Tab, TextField} from '@mui/material';
import { loginUser } from '../../API/login';
import { useDispatch } from 'react-redux';
const Login = () => {
  const dispatch=useDispatch()
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email:"",
    password:""
  });
  const updateData = (event) => {
    setErrors({
      ...errors,
      [event.target.name]: false,
    });

    setUserData((prevalue) => ({
      ...prevalue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
        // Validate form data
        if (userData.email === '') {
          setErrors((prevErrors) => ({ ...prevErrors, email: true }));
        }
        if (userData.password === '') {
          setErrors((prevErrors) => ({ ...prevErrors, password: true }));
        }
        // Perform form submission logic here if all fields are valid
        if (userData.email !== '' && userData.password !== '') {
          // handpostformdata()
          dispatch(loginUser(userData.email,userData.password,navigate))
          .then((response)=>{
            console.log(response)
          })
          
        }
  };


  return (
  
      <Grid
        container
        spacing={3} // Adding spacing between the grid items
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100%', height: '400px', maxWidth: '400px', margin: 'auto' }}
      >
        <Paper elevation={3} style={{ padding: '20px',width: '80%' }}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Username"
                name="email"
                value={userData.username}
                onChange={updateData}
                size="small"
                margin="normal" // Adding spacing below the input field
                error={errors.email} // This will show an error style
                helperText={errors.email ? 'Field is required' : ''} // This will display the error message
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                name="password"

                type="password"
                size="small"
                value={userData.password}
                onChange={updateData}
              margin="normal" // Adding spacing below the input field
                error={errors.password}
                helperText={errors.password ? 'Field is required' : ''}
              />

            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                Log In
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>

  );
};

export default Login;
