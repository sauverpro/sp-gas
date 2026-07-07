import React from 'react'
import { Link } from 'react-router-dom';
import addmanager from "./AdminManagers.module.css";
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
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  import axios from 'axios';
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { IoMdArrowRoundBack } from "react-icons/io";

const AdminAddManager = () => {
   const navigate = useNavigate();
   
   const [managerName , setManagerName] = useState("");
   const [managerEmail , setManagerEmail] = useState("");
   const [managerPhone , setManagerPhone] = useState("");
   const [managerId , setManagerId] = useState("");

   const submitManager = (e) => {

    if(managerName == ""){
      toast.error("State the new manager name");
      return;
    } 
    if(managerPhone == ""){
      toast.error("Missing manager phone number");
      return;
    }
    if(managerEmail == ""){
      toast.error("Missing manager email");
      return;
    }
    if(managerId == ""){
      toast.error("Missing manager email");
      return;
    }

    e.preventDefault();
    let token = localStorage.getItem("token");
    console.log();
    axios({
        method : "POST",
        url : "https://sp-gas-api.onrender.com/api/v1/auth/managers/register",
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json", 
        },
        data : {
          FullNames : managerName,
          Email : managerEmail,
          PhoneNumber : managerPhone,
          IdNumber : managerId,
        },  
    })
    .then((Response)=>{
      console.log(Response);
      toast.success("Manager registered succesfully");
      setTimeout(() => {
        navigate("/dashboard/adminmanagers");
      }, 2000);
    })
    .catch((error) =>{
      console.log(error);
      toast.error(error.message);
    })
   };

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
        <Link to='/dashboard/adminmanagers' className={addmanager.retButton}><IoMdArrowRoundBack className={addmanager.returnArrow}/></Link> 
        <MdOutlineNoteAdd className={addmanager.icon}/>
         Add New Station Managers
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={addmanager.stationform}>
      <TextField
            
            onChange={(e) => {
              e.preventDefault();
              setManagerName(e.target.value);
            }}

          type='text'
          id="default-value"
          label="Full Name"
          variant="outlined"
          defaultValue="Gatera Ulyse"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <TextField

          onChange={(e) => {
            e.preventDefault();
            setManagerPhone(e.target.value);
          }}

          type='text'
          id="outlined-password-input"
          label="Phone Number"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

       <TextField

          onChange={(e) => {
            e.preventDefault();
            setManagerId(e.target.value);
          }}


          type='text'
          id="outlined-password-input"
          label="ID"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />

       <TextField

          onChange={(e) => {
            e.preventDefault();
            setManagerEmail(e.target.value);
          }}


          type='text'
          id="outlined-password-input"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
    
        <div>
          <Button color="primary" variant="contained"  onClick={submitManager} >
            Submit
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

export default AdminAddManager
