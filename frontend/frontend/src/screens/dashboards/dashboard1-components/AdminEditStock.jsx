import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import admTariff from "./AdminTariff.module.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import {
  Card,
  CardContent,
  Divider,
  Box,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { BiSolidEdit } from "react-icons/bi";

function AdminEditStock() {
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
        <Link to='/dashboard/adminstock' className={admTariff.retButton}><IoMdArrowRoundBack className={admTariff.returnArrow}/></Link> 
        <BiSolidEdit className={admTariff.editicon}/>
         Edit Stock
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={admTariff.stationform}>
        
      <div className={admTariff.flexField}>
        

          <TextField
            id="outlined-password-input"
            type='Text'
            label="Type Of Bottle"
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
            }}
            className={admTariff.flexFields}
          />

       <TextField
            id="outlined-password-input"
            type='number'
            label="Quantity"
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
            }}
            className={admTariff.flexFields}
          />

          
        </div>

        <TextField
          id="outlined-password-input"
          label="Total Cylinders"
          type='number'
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
    
        <div>
          <Button color="primary" variant="contained" className={admTariff.updateTariff}>
            Update Stock
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
    </Grid>
  </Grid>
  )
}

export default AdminEditStock
