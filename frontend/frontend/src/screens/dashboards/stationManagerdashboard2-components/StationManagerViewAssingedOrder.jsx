import React from 'react'
import { Link } from 'react-router-dom';
import viewAssignedorder from './StationManagerAssignedOrder.module.css';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { 
    Card,
    Button,
    TextField,
    MenuItem,
 } from "@material-ui/core";
 import { MdVerified } from "react-icons/md";
 import userdetailsStyles from "./StationManagerAssignedOrder.module.css";

function StationManagerViewAssingedOrder() {

  const navigate = useNavigate();  
// ================ Fetching Assigned Order Details ===========================================

  const params = useParams();
  const stationManaDetailId = params.id;

  const [clientName, setClientName] = useState();
  const [clientLocation, setClientLocation] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [price, setPrice] = useState();
  const [status, setStatus] = useState();
  const [assignedDriver , setAssignedDriver] = useState();
  const [product , setProduct] = useState([]);
  const [userAddOn , setUserAddOn] = useState([]);
  const [orderId, setOrderId] = useState();
  const [paymentStatus , setPayementStatus] = useState();

  const [users , setUsers] = useState([]);

  const [userDetails, setUserDetails] = useState({ pice: "" });
 
  const fectchManaAssignedOrders = () =>{
    let token = localStorage.getItem("token");

    axios({
        method : "GET",
        url : `https://sp-gas-api.onrender.com/api/v1/order/${stationManaDetailId}`,
        headers : {
            Authorization : `Bearer ${token}`,
            "content-type" : "application/json",
        },
    })
    .then((response) => {
        console.log(response, "resppppp");
        setClientName(response?.data?.CartId?.UserId?.FullNames);
        setClientLocation(response?.data?.address);
        setPhoneNumber(response?.data?.phoneNumber);
        setEmail(response?.data?.CartId?.UserId?.Email);
        setPrice(response?.data?.TotalOrder);
        setStatus(response?.data?.Status);
        setAssignedDriver(response?.data?.DriverId?.FullNames);
        setProduct(response?.data?.CartId?.products);
        setUserAddOn(response?.data?.CartId?.addOns);
        setOrderId(response?.data?._id);
     
        setPayementStatus(response?.data?.isPaid);
        setUserDetails(response?.data?.userDetails || { pice: "" });
    })
    .catch((error) => {
        console.log(error);
    })
};
useEffect(() => {
    fectchManaAssignedOrders();
}, []);

// ================ End Fetching Assigned Order Details ===========================================

const getStatuText = () => {
  return paymentStatus ? "Paid" : "Not Paid";
};

const getStatuClassName = () => {
  return paymentStatus ? userdetailsStyles.pay : userdetailsStyles.notPay;
};

// ================================== fetch Drivers ===============================
   
const filterDriver = users.filter(driver => driver.Role === "Driver" );

const [driverId , setDriverId] = useState("");

const fetchDrivers = () =>{
 let token = localStorage.getItem("token");
 axios({
   method : "GET",
   url : "https://sp-gas-api.onrender.com/api/v1/users",
   headers : {
     Authorization : `Bearer ${token}`,
   },
 })
 .then((Response)=>{
   setUsers(Response.data.data);
 })
 .catch((error)=>{
   console.log(error);
 })
};
useEffect(()=>{
 fetchDrivers();
},[]);

 // ============================= END fetch Drivers =================================


 //******************************handle Approve Order to driver*********************//

 const handleApproveDriverOrder = () => {

    if(driverId == ""){
        toast.error("please, assign the order to the driver");
        return;
    }

    let token = localStorage.getItem("token");
    axios({
        method : "PUT",
        url : `https://sp-gas-api.onrender.com/api/v1/order/updateDriver/${orderId}`,
        data : {
            DriverId : driverId,
        },
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json",
        },
    })
    .then((response) => {
        console.log(response);
        toast.success("Order Successfully Assigned to driver");
        setTimeout(() => {
          navigate("/dashboard/stationmanagerassignedorder");
        }, 2000);
    })
    .catch((error) => {
        console.log(error);
        toast.error(error.message);
    })
 };

 //******************************End Handle Approve Order to driver****************//


 // ============================== Status Color ==================================================

 let backgroundColor = 'initial';
 let textColor  = 'initial';
  
switch (status) {
    case 'Completed':
      backgroundColor = 'green';
      textColor = 'white';
      break;
    case 'Delivering':
      backgroundColor = 'blue';
      textColor = 'white';
      break;
      case 'Processing':
      backgroundColor = 'grey';
      textColor = 'black';
      break;
    default:
      break;
  }

// ============================== End Status Color ==================================================


 
  return (
    <div>
     <Card className={viewAssignedorder.container}>
            <div className={viewAssignedorder.headButton}>
                <Link to='/dashboard/stationmanagerassignedorder' className={viewAssignedorder.retButton}><IoArrowBackCircleSharp  className={viewAssignedorder.returnArrow}/></Link>  
               <h1 className={viewAssignedorder.title}>
                Assigned Order Details
               </h1>
            </div> 
                <div className={viewAssignedorder.main}>
                    <div className={viewAssignedorder.left}>
                      <h3 className={viewAssignedorder.leftTitle}>Client name:</h3>
                      <p className={viewAssignedorder.leftName}>{clientName}</p>
                      <h3 className={viewAssignedorder.leftTitle}>Phone Number:</h3>
                      <p className={viewAssignedorder.leftName}>{phoneNumber}</p> 
                      <h3 className={viewAssignedorder.leftTitle}>Email:</h3>
                      <p className={viewAssignedorder.leftName}>{email}</p>
                      <h3 className={viewAssignedorder.leftTitle}>Location:</h3>
                      <p className={viewAssignedorder.leftName}>{clientLocation}</p>
                    </div>
                    <div className={viewAssignedorder.right}>
                        <div className={viewAssignedorder.rightTitlee}> 
                            <p className={viewAssignedorder.paraWidthh}>Kilograms</p> 
                            <p className={viewAssignedorder.paraWidthh}>Type</p> 
                            <p className={viewAssignedorder.paraWidthh}>Quantity</p>
                        </div>
                            {product?.map((pro)=>{
                            return (
                            <div className={viewAssignedorder.rightContent}>
                                <p className={viewAssignedorder.paraWidth}> {pro?.productId?.Kilograms} </p>
                                <p className={viewAssignedorder.paraWidth}> {pro?.productId?.Type} </p>
                                <p className={viewAssignedorder.paraWidth}> {pro?.quantity} </p>
                            </div> 
                            )
                        })}
                        <div className={viewAssignedorder.payment}>
                            <div className={viewAssignedorder.status}><h3>Total Amount:</h3> <p>Rwf {price?.toLocaleString()}</p></div>
                            <div className={viewAssignedorder.status}><h3>Order Status:</h3> <p style={{ backgroundColor, color: textColor }}>{status}</p></div>
                            <div className={viewAssignedorder.status}><h3>Payment Status:</h3> <p className={`${userDetails.pice} ${getStatuClassName()}`} > {getStatuText()} </p></div>
                            <div className={viewAssignedorder.status}><h3>Assigned Driver:</h3> <p>{assignedDriver}</p></div>
                        </div>  
                        {status !== "Completed" && (
                    <section> 
                        <h3 className={viewAssignedorder.rightTitlee}>Assign Orders To The Driver </h3> 
                        <TextField
                            className={viewAssignedorder.label}
                            id="standard-select-number"
                            variant="outlined"
                            select
                            label="Choose driver"
                            sx={{
                                mb: 2,
                            }}                        
                            onChange={(e) => {
                                e.preventDefault();
                                setDriverId(e.target.value);
                              }}
                            > 
                            {filterDriver.map((driver) => {
                                return(
                                <MenuItem key={driver._id} value={driver._id}>
                                  {driver.FullNames}
                                </MenuItem> 
                                )
                            })}
                        </TextField> 
                        
                          <Button
                            variant="contained"
                            color="success"
                            sx={{
                                mr: 1,
                                mb: 1,
                            }}
                            className={viewAssignedorder.approveButton}
                            onClick={handleApproveDriverOrder}
                            >
                                <MdVerified  className={viewAssignedorder.approveCon}/>
                                Approve & Send To Driver
                    </Button>
                        </section>
                         )}  
                    </div>
                    <div>
                           <h3 className={viewAssignedorder.rightTithle}> AddOns </h3>
                       {userAddOn?.map((ad)=>{
                         return (
                           <div className={viewAssignedorder.rightContentt}>
                           <p> {ad?.Count}</p>
                           <p> {ad?.addonId?.Name} </p>
                           </div> 
                         )
                       })}
                    </div>
                </div> 
                <ToastContainer/>      
        </Card>            
    </div>
  )
}

export default StationManagerViewAssingedOrder
