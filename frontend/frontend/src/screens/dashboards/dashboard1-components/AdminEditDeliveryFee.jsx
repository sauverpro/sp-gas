import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import edit from "./AdminEditUnitPrice.module.css";
import {
  TextField,
} from "@material-ui/core";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function AdminEditDeliveryFee({closeEditde}) {

    const navigate = useNavigate();

// =============================    Fetch Delivery Fees ====================================

const [deliveryFeeId , setDeliveryFeeId] = useState();

const fetchDelivery = () =>{
  let token = localStorage.getItem("token");
      axios({
        method : "GET",
        url : "https://sp-gas-api.onrender.com/api/v1/deliveryfee/getAllDelFee",
        headers : {
          Authorization : `Bearer ${token}`,
        },
      })
      .then((Response)=>{
        setDeliveryFeeId(Response?.data?.Amount[0]?._id);
      })
      .catch((error)=>{
        console.log(error);
      })
}
useEffect(()=>{
   fetchDelivery();
},[]);

// =============================  End  Fetch Delivery Fees ====================================
    

// =========================== Edit Delivery Fee Fetching  ==============================

 const [delivery , setDelivery] = useState(0);
 console.log(delivery ,"feeeeeeee");
 const addNewDeliveryFee = (e) => {
  
  if(delivery == 0){
    toast.error("State new Delivery Fee");
    return;
  }

    let token = localStorage.getItem("token");
    e.preventDefault();
    axios({
        method : "PATCH",
        url: `https://sp-gas-api.onrender.com/api/v1/deliveryfee/${deliveryFeeId}`,
        data: {
            id : deliveryFeeId,
            Amount : Number(delivery),
        },
        headers : {
            Authorization : `Bearer ${token}`,
        },
    })
    .then((Response)=>{
        toast.success("Delivery Fee Updated Successfully");
        setTimeout(()=>{
         window.location.reload();
        }, 4500);
    })
    .catch((error)=>{
        toast.error(error.message);
        console.log(error);
    })
 };


// =========================== End Edit Delivery Fee Fetching  ===========================

  return (
  <div className={edit.eContainer}>
    New Delivery Fee
    <TextField
       className={edit.in}
        type='number'
        variant="outlined"
        onChange={(e) =>{
          e.preventDefault();
          setDelivery(e.target.value);
        }}
      />  
    <div onClick={closeEditde}> <button className={edit.save} onClick={addNewDeliveryFee}>Save</button></div> 
    <ToastContainer/>
  </div>
  )
}

export default AdminEditDeliveryFee
