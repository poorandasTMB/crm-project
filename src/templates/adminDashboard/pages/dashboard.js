import React from "react";
import BarChart from "../components/chart/chart";
import DonutChart from "../components/chart/donutChart";
import { Grid } from '@mui/material';
export default function AdminDashboard() {
  return (
    <Grid container spacing={6}>
      {/* Bar Chart */}
      <Grid item xs={6} sm={6} style={{ padding: '150px' }}>
        <BarChart />
      </Grid>
      {/* Donut Chart */}
      <Grid item xs={6} sm={6} style={{ padding: '150px' }}>
        <DonutChart />
      </Grid>
    </Grid>
  );
};

