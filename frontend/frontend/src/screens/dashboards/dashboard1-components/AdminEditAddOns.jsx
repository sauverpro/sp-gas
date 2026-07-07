import React from 'react'
import admTariff from "./AdminTariff.module.css";
import { useState } from 'react'; 
import axios from 'axios';
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Divider,
  Box,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { MdOutlineNoteAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminEditAddOns() {
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
        <Link to='/dashboard/adminaddons' className={admTariff.retButton}><IoMdArrowRoundBack className={admTariff.returnArrow}/></Link>  
        <BiSolidEdit className={admTariff.addIcon}/>
         Edit AddOns
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={admTariff.stationform}>
      <TextField
          type="file"
          src=""
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

       <TextField
          type='text'
          label="Name"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />  

      <TextField
          type='number'
          label="Price"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

        <div>
          <Button color="primary" variant="contained" className={admTariff.updateTariff} >
            Save AddOns
          </Button>
        </div>
      </form>
      <ToastContainer />
    </CardContent>
  </Card>
    </Grid>
  </Grid>
  )
}

export default AdminEditAddOns
