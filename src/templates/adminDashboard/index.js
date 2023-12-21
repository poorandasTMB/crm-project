import { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './components/header';
import Asidebar from './components/asideBar';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

export default function AdminDashboardLayout() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} draweropen={open} />
      {/* <Asidebar toggleDrawer={toggleDrawer} draweropen={open} /> */}
      <Box component="main" sx={{
        flexGrow: 1, p: 5, mt: 6,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        height: "calc(100vh - 48px)",
        overflow: 'auto',
      }}>
        <Outlet />
      </Box>
    </Box>
  );
}