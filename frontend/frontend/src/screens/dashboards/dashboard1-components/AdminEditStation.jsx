import React from 'react'
import add from "./AdminStations.module.css";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { BiSolidEdit } from "react-icons/bi";


const AdminEditStation = () => {

    const managers = [
        {
          value: "Gakuba Ulyse",
          label: "Gakuba Ulyse",
        },
        {
          value: "Sibomana Yves",
          label: "Sibomana Yves",
        },
        {
          value: "Sibomana Yves",
          label: "Sibomana Yves",
        },
      ];

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
        <BiSolidEdit className={add.icon}/>
         Edit Station
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={add.stationform}>
      <TextField
          id="default-value"
          label="Station Name"
          variant="outlined"
          defaultValue="SP GAS Gatenga"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

          <TextField
          fullWidth
          id="standard-select-number"
          variant="outlined"
          select
          label="Manager"
          sx={{
            mb: 2,
          }}
        >
          {managers.map((manager) => (
            <MenuItem key={manager.value} value={manager.value}>
              {manager.label}
            </MenuItem>
          ))}
        </TextField>
        


        <TextField
          id="outlined-password-input"
          label="Location"
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

export default AdminEditStation
