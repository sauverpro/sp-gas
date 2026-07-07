import React from 'react'
import { Link } from 'react-router-dom';
import editDriver from './EditDriver.module.css'
import {
    Card,
    CardContent,
    Divider,
    Box,
    TextField,
    Button,
    Grid,
    MenuItem,
  } from "@material-ui/core";
import { IoMdArrowRoundBack } from "react-icons/io"
import { BiSolidEdit } from "react-icons/bi";

function EditDriver() {
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
        <Link to='/dashboard/driverDetail' className={editDriver.retButton}><IoMdArrowRoundBack className={editDriver.returnArrow}/></Link>
        <BiSolidEdit className={editDriver.icon}/>
         Edit Driver
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={editDriver.stationform}>
        
      <TextField
          id="default-value"
          label="Driver Name"
          variant="outlined"
          defaultValue="Gatera"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

        <TextField
          id="outlined-password-input"
          label="Location"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        >
            <MenuItem>
                <ol>
                    <li>Gatanga</li>
                    <li>Kimironko</li>
                    <li>Kibagabaga</li>
                    <li>Karuruma</li>
                </ol>
            </MenuItem>
        </TextField>

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

export default EditDriver
