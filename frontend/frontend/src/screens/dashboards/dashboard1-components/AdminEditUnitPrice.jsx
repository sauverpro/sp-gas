import React from 'react'
import { useState } from 'react';
import edit from "./AdminEditUnitPrice.module.css";
import {
  TextField,
} from "@material-ui/core";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function AdminEditUnitPrice({closeEditu}) {

const navigate = useNavigate();

  // =========================== Edit Unit PRICE Fetching  ==============================

 const [unitPrice , setUnitPrice] = useState(0);
 const addNewUnitPrice = (e) => {
  
  if(unitPrice == 0){
    toast.error("State new unit price");
    return;
  }
  
    let token = localStorage.getItem("token");
    e.preventDefault();
    let data = new FormData();
    data.append("Price", unitPrice); 
    console.log(data,"dddddddddddd");
    
    axios({
        method : "POST",
        url: "https://sp-gas-api.onrender.com/api/v1/tariff/add",
        data: data ,
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },

    })
    .then((Response)=>{
        toast.success("Unit Price Updated Successfully");
        setTimeout(()=>{
          window.location.reload();
         }, 4500);
    })
    .catch((error)=>{
        toast.error(error.message);
        console.log(error);
    })
 };


// =========================== End Edit Unit PRICE Fetching  ===========================

  return (
    <div className={edit.eContainer}>
      New Unit Price
      <TextField
         className={edit.in}
          type='number'
          variant="outlined"
          onChange={(e) =>{
            e.preventDefault();
            setUnitPrice(e.target.value);
          }}
        />  
      <div onClick={closeEditu}> <button className={edit.save} onClick={addNewUnitPrice}>Save</button></div> 
      <ToastContainer/>
    </div>
  )
}

export default AdminEditUnitPrice
