import React from 'react';
import { useState } from 'react'; 
import axios from 'axios';
import admTariff from "./AdminTariff.module.css"
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
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

function AdminAddTariff() {

  // ==========================   Adding tarrif Fetching =========================

  const navigate = useNavigate();
  const [tarrifImage, setTarrifImage] = useState("");
  const [kilogram, setKilogram] = useState(0);
  const [type , setType] = useState();
  const submitTarrif = (e) =>{
    
    if(tarrifImage == ""){
      toast.error("insert tarrif image for the product");
    }
    if(kilogram == 0){
      toast.error("State the kilograms of the product");
      return;
    }
    if(type == ""){
      toast.error("State the type of the produt");
      return;
    }
    e.preventDefault();

    let data = new FormData();
    data.append("Image" , tarrifImage);
    data.append("Kilograms" , kilogram);
    data.append("Type" , type);
  
    let token = localStorage.getItem("token");

    axios({
      method: "POST",
      url: "https://sp-gas-api.onrender.com/api/v1/product/register",
      data: data,
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((Response)=>{  
      console.log(Response);
      toast.success("Product added Succesfully");
      setTimeout(() => {
        navigate("/dashboard/admintariff");
      }, 2000);
    })
    .catch((error) =>{
      console.log(error);
      toast.error(error.message);
    })
  };
 // ==========================  End Adding tarrif Fetching =========================


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
        <Link to='/dashboard/admintariff' className={admTariff.retButton}><IoMdArrowRoundBack className={admTariff.returnArrow}/></Link>  
        <MdOutlineNoteAdd className={admTariff.addIcon}/>
         Add Tarrif
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

          onChange={(e) => {
            e.preventDefault();
            setTarrifImage(e.target.files[0]);
          }}
        />

       <TextField
          type='text'
          label="Type"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}

          onChange={(e) =>{
            e.preventDefault();
            setType(e.target.value);
          }}
        />  

      <TextField
          type='number'
          label="Kilograms"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}

          onChange={(e) => {
            e.preventDefault();
            setKilogram(e.target.value);
          }}
        />

        <div>
          <Button color="primary" variant="contained" className={admTariff.updateTariff} onClick={submitTarrif}>
            Add Tarrif
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

export default AdminAddTariff
