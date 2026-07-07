import addadd from "./AdminAddOns.module.css";
import admTariff from "./AdminTariff.module.css";
import React from 'react'
import { useState } from 'react'; 
import { useEffect } from "react";
import axios from 'axios';
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
  MenuItem,
} from "@material-ui/core";
import { MdOutlineNoteAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminAddAddOns() {

  const navigate = useNavigate();

  // =========================== Adding AddOns   ==============================

  const [addonImage, setAddonImage] = useState("");
  const [addonName, setAddonName] = useState("");
  const [addonPrice, setAddonPrice] = useState("");
  const [tarrifs, setTarrifs] = useState([]);
  const [product , setProduct] = useState([]);
  console.log(product ,"pppprrorororororo info");

  const handleAddAddonForm = (e) => {

    if(addonImage){}

    const formData = new FormData();
    formData.append("Image", addonImage);
    formData.append("Name", addonName);
    formData.append("Price", addonPrice);
    formData.append("productId" , product);

    e.preventDefault();
   let token = localStorage.getItem("token");
    axios({
      method: "POST",
      url: "https://sp-gas-api.onrender.com/api/v1/addons/add",
      data: formData,
      headers:{
        Authorization : `Bearer ${token}`,
        "content-Type" : "multipart/form-data",
      },
    })
    .then((response) =>{
      console.log(response);
      toast.success("AddON Added Successfully");
      setTimeout(() => {
          navigate("/dashboard/adminaddons");
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message);
    })
  };

 // =========================== END Adding AddOns   ===============================


 // =========================== Product Fetching  ==============================

      let token = localStorage.getItem("token");
      const fetchTarrifs = () => {
          axios({
              method: "GET",
              url: "https://sp-gas-api.onrender.com/api/v1/product",
              headers : {
                  Authorization : `Bearer ${token}` ,
                  "Content-Type" : "application/json; charset=utf-8",
              }
    
          })
          .then((Response) =>{
              setTarrifs(Response.data.data);
              // console.log(Response ,"rrreeeeeeeeerrrr");
          })
          .catch((error) => {
              console.log(error);
          });
      }
    
      useEffect(()=>{
          fetchTarrifs();
      },[]);
    
    // =========================== END Product Fetching  ==========================

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
        <MdOutlineNoteAdd className={admTariff.addIcon}/>
         Add AddOns
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
          onChange={(e)=>{
            setAddonImage(e.target.files[0]);
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
          onChange={(e)=>{
            setAddonName(e.target.value);
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
          onChange={(e)=>{
            setAddonPrice(e.target.value);
          }}
        />   
        <TextField
              fullWidth
              variant="outlined"
              select 
              multiple
              label="product"
              sx={{
                mb: 2,
              }}
              onChange={(e)=>{
                setProduct(e.target.value);
              }}
            >
             {tarrifs.map((product) => ( 
                <MenuItem  key={product._id} value={product._id}>
                 {product.Kilograms} kg , {product.Type}
                </MenuItem>
              ))}
        </TextField> 
         <br />
         <div>
          <Button color="primary" variant="contained" className={admTariff.updateTariff} 
            onClick={handleAddAddonForm}
          >
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

export default AdminAddAddOns
