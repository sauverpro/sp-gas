import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Box } from "@material-ui/core";
import staMaDashboard from './StationManagerDashboard.module.css'
import StationOverView from '../dashboard1-components/StationOverView';
import StationDailyActivities from '../dashboard1-components/StationDailyActivities';
import StationProductPerformance from '../dashboard1-components/StationProductPerformance';
import StationManagerStatusCards from '../dashboard1-components/StationManagerStatusCards';

function StationManagerDashboard() {
  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 0 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <StationManagerStatusCards/>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <StationOverView/>
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        {/* <Grid item xs={12} lg={5}>
          <StationDailyActivities/>
        </Grid> */}
        {/* ------------------------- row 3 ------------------------- */}
      </Grid>
    </Box>
  )
}

export default StationManagerDashboard
