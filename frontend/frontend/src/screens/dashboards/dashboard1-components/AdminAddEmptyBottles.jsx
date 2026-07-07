import React from 'react'
import empty from "./AdminAddEmptyBottles.module.css";
import {
    Card,
    CardContent,
    Divider,
    Box,
    Button,
    Grid,
    TextField,
    MenuItem,
  } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useEffect } from 'react';
import { MdOutlineNoteAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { IoCloseCircleSharp } from "react-icons/io5";

function AdminAddEmptyBottles({closeBottle}) {

  const navigate = useNavigate();

  // =========================== Product Fetching  ==============================

  const [tarrifs, setTarrifs] = useState([]);
  let token = localStorage.getItem("token");
  const fetchTarrifs = () => {
      axios({
          method: "GET",
          url: "https://sp-gas-api.onrender.com/api/v1/product",
          headers : {
              Authorization : `Bearer ${token}` ,
              "Content-Type" : "application/json; charset=utf-8",
          },
      })
      .then((Response) =>{
          setTarrifs(Response.data.data);
      })
      .catch((error) => {
          console.log(error);    
      });
  };

  useEffect(()=>{
      fetchTarrifs();
  },[]);

// =========================== END Product Fetching  ============================

// =========================== Empty Bottles Fetching Adding   ============================

 const [bottleValue , setBottleValue] = useState("");
 const [produc , setProduc] = useState([]);

 console.log(produc, "productIdarray");
const submitEmptyBotles = (e) => {

  e.preventDefault();
  
  if(produc == ""){
    toast.error("You must put the Product with empty bottle");
   return;
   }
   if(bottleValue == ""){
    toast.error("You must put the Quantity for empty bottle");
    return;
   }
  let token = localStorage.getItem("token");
  axios({
     method : "POST",
     url: "https://sp-gas-api.onrender.com/api/v1/adminStock/empty",  
     data : {  
      productId : produc,
      emptyValue: Number(bottleValue),
    },
    headers : {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((Response)=>{
    toast.success("Empty Bottles Added Succesfully");
    console.log(Response);
    setTimeout(() => {
      closeBottle();
      window.location.reload();
    }, 2000);
  })
  .catch((error)=>{
    console.log(error);
    toast.error(error.message);
  })
};

// =========================== END Empty Bottles Fetching Adding  ============================

  return (
  <div className={empty.back}>
 <Grid container spacing={0} className={empty.container}>
          <Grid item lg={12} md={12} xs={12}>
              <card 
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
            <MdOutlineNoteAdd className={empty.icon}/>
             Add Empty Bottles
             <IoCloseCircleSharp className={empty.closeIcon} onClick={closeBottle}/>
        </Box>
        <Divider />
        <CardContent   sx={{
            padding: "30px",
          }}>

        <form  className={empty.form}>

           <TextField
              fullWidth
              variant="outlined"
              select
              label="Product"
              sx={{
                mb: 2,
              }}
              onChange={(e) => {
                e.preventDefault();
                setProduc(e.target.value);
              }}
            >
              {tarrifs.map((product)=> (
                <MenuItem key={product._id} value={product._id}>
                 {product.Kilograms} kg , {product.Type}
                </MenuItem>
              ))}
              
            </TextField>

         <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              type='number'
              sx={{
                mb: 2,
              }}
              onChange={(e) => {
                e.preventDefault();
                setBottleValue(e.target.value);
              }}
            />
             <div>
               <Button color="primary" variant="contained" onClick={submitEmptyBotles}>
                Submit
              </Button>
              </div>
           
        </form>
          </CardContent>
         </card> 
         <ToastContainer/>
         </Grid>
  </Grid> 
  </div>
       
      
  )
}

export default AdminAddEmptyBottles
