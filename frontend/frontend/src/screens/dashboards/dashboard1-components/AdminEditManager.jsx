import React from 'react'
import editmanager from "./AdminManagers.module.css";
import {
    Card,
    CardContent,
    Divider,
    Box,
    TextField,
    Button,
    Grid,
  } from "@material-ui/core";
  import { BiSolidEdit } from "react-icons/bi";;

function AdminEditManager() {
  return (
    <Grid container spacing={0}>
    <Grid item lg={12} md={12} xs={12}>
    <Card
    variant="outlined"
    sx={{
      p: 0,
    }}
  >
    <Box
      sx={{
        padding: "15px 30px",
      }}
      display="flex"
      alignItems="center"
    >
        <BiSolidEdit className={editmanager.icon}/>
         Edit Manager
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={editmanager.stationform}>
        
      <TextField
          id="default-value"
          label="Full Name"
          variant="outlined"
          defaultValue="Gatera"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

        <TextField
          id="outlined-password-input"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

       <TextField
          id="outlined-password-input"
          label="ID"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

         <TextField
          id="outlined-password-input"
          label="Phone Number"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
    
        <div>
          <Button color="primary" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
    </Grid>
  </Grid>
  )
}

export default AdminEditManager
