
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';  
import List from '@mui/material/List';
import {useState} from "react"
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import Login from '../../auth/login';

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const {auth}= useSelector((state)=>state)
  const [activenav,Setactivenav]=useState(1)
  const drawerItems = [
    { to: 'dashboard', icon: "", text: 'Dashboard' },
    { to: 'product', icon: "", text: 'products' },
  ];
React.useEffect(()=>{
  if(auth.isAuthenticated){
    setOpen(false)
  }
  
},[auth.isAuthenticated])
const login=()=>{
  setOpen(true)
}

  return (
    <React.Fragment>
      <Box width={"100%"} position="absolute" zIndex={999}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block'} }}
          >
            CRM
          </Typography>
          <List component="nav" sx={{ display: 'flex', marginLeft: '50px' }}>
            {drawerItems.map((items,index) => {
              if(!auth.isAuthenticated && items.text=="Dashboard"){
                return 
              }
              else{
                return (
                  <ListItemButton   sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#61337d', // Set your desired selected color
                    },
                    '&:hover': {
                      backgroundColor: '#61337d', // Set your desired hover color
                    },
                  }} component={Link} to={items.to} onClick={(()=>{Setactivenav(index)})} selected={index===activenav}>
                    <ListItemText primary={items.text} />
                  </ListItemButton>
                )
              }
             
            })}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
           
              aria-haspopup="true"
        
              color="inherit"
            >
              {auth.isAuthenticated ? (
          // Render the AccountCircle with the image
          <img style={{ height: '50px',width:"50px",objectFit:"cover", borderRadius: '50%' }} src={auth.user.image} alt="Profile" />
        ) : (
          // Render the default AccountCircle
          <IconButton style={{ color: 'white' }} onClick={login}>Login</IconButton>
        )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

    </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            maxHeight: '400px',
            width: '400px',
          },
        }}
      >
        <Login/>
      </Dialog>
    </React.Fragment>
    
  );
}







