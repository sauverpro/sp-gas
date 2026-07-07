import React from 'react'
import { Link } from 'react-router-dom'
import addDriver from './AddDriver.module.css'
import {
  Card,
  CardContent,
  Divider,
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core"
import { IoMdArrowRoundBack } from "react-icons/io"
import { MdOutlineNoteAdd } from "react-icons/md"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import axios from 'axios'

function AddDriver() {


  // ==================== Add Driver Fetching ================================

  const navigate = useNavigate();
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [driverId , setDriverId] = useState("");
  const [phoneNumber , setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleAddDriver = (e) => {

    if(fullNames == ""){
      toast.error("Missing driver name");
      return;
    }
    if(email == ""){
      toast.error("Missing driver email");
      return;
    }
    if(driverId == ""){
      toast.error("Missing driver ID");
      return;
    }
    if(phoneNumber == ""){
      toast.error("Missing driver email");
      return;
    }
    if(password == ""){
      toast.error("Missing driver Password");
      return;
    }

    e.preventDefault();
    axios({
      method: "POST",
      url: "https://sp-gas-api.onrender.com/api/v1/users/register",
      data: {
        Email: email,
        PhoneNumber: phoneNumber,
        FullNames: fullNames,
        Password: password,
        IdNumber: driverId,
        Role: "Driver",
      },
    })
      .then((Response) => {
        toast.success("Driver Registered Successfully");
        setTimeout(() => {
          navigate("/dashboard/drivers");
        }, 2000);
        console.log(Response , "reeeeeeeeeeeeeeeeeeee");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // ==================== Add Driver Fetching =================================


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
        
        <Link to='/dashboard/drivers' className={addDriver.retButton}><IoMdArrowRoundBack className={addDriver.returnArrow}/></Link>
        <MdOutlineNoteAdd className={addDriver.icon}/>
         Add New Driver
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={addDriver.stationform}>
      <TextField
          type='text'
          id="default-value"
          label="Driver Name"
          variant="outlined"
          defaultValue="Gatete"
          fullWidth
          sx={{
            mb: 2,
          }}
          onChange={(e) => {
            e.preventDefault();
            setFullNames(e.target.value);
          }}

        />
        <TextField
          type='email'
          id="outlined-password-input"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }} 
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}           
        /> 

       <TextField
          type='number'
          id="outlined-password-input"
          label="Driver ID"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
          onChange={(e) => {
            e.preventDefault();
            setDriverId(e.target.value);
          }}            
        /> 

        <TextField
          type='number'
          id="outlined-password-input"
          label="Phone Number"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }} 
          onChange={(e) => {
            e.preventDefault();
            setPhoneNumber(e.target.value);
          }}           
        /> 

       <TextField
          type='password'
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}  
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}           
        />

        <div className={addDriver.submitcont}>
          <Button color="primary" variant="contained" onClick={(e) => handleAddDriver(e)}>
             Save
          </Button>
        </div>
        <ToastContainer />
      </form>
    </CardContent>
  </Card>
    </Grid>
  </Grid>
 );
}

export default AddDriver
