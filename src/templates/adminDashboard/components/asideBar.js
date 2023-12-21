import * as React from 'react';
import {useState} from "react"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { Button, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import { useNavigate,Link ,useLocation} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      justifyContent: 'space-between',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


export default function MainListItems(props) {
  const location = useLocation();
  console.log(location)
  const [activenav,Setactivenav]=useState(0)
  // Logout 
  const navigate = useNavigate();
  const logouthandle = () => {
    localStorage.clear();
    navigate('/')
  }


  const drawerItems = [
    { to: 'dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
    { to: 'products', icon: <ProductionQuantityLimitsIcon />, text: 'products' },
  ];

  return (
    <React.Fragment>
      <Drawer variant="permanent" open={props.draweropen}>
        <Stack>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              ...(props.draweropen === false && { display: 'none' })
            }}
          >
            <IconButton onClick={props.toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>

          </Toolbar>
          <Toolbar
            sx={{
              alignItems: 'center',
              px: [1],
              ...(props.draweropen === true && { display: 'none' })
            }}
          >
            <IconButton onClick={props.toggleDrawer}>
              <MenuIcon />
            </IconButton>

          </Toolbar>

          <Divider />
          <List component="nav">
            {drawerItems.map((items,index) => {
              return (
                <ListItemButton component={Link} to={items.to} onClick={(()=>{Setactivenav(index)})} selected={index===activenav}>
                  <ListItemIcon > 
                    {items.icon}
                  </ListItemIcon>
                  <ListItemText primary={items.text} />
                </ListItemButton>
              )
            })}
          </List>
        </Stack>
        <Stack direction="row" spacing={2} ml={2} mb={2} >
          <Button onClick={logouthandle} variant="contained" color="primary" startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Stack>
      </Drawer>

    </React.Fragment>
  )
}


