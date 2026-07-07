import React from 'react'
import { Card,TextField, MenuItem, Button } from '@material-ui/core'
import AdminStationOrders from '../dashboard1-components/AdminStationOrders.module.css'
import { Link } from 'react-router-dom'
import { FaThumbsUp } from "react-icons/fa"
import { FaThumbsDown } from "react-icons/fa"
import { IoMdArrowRoundBack } from "react-icons/io"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircleSharp } from "react-icons/io5";
import { fontWeight } from '@material-ui/system'

function AdminStationOrderDetail() {
  const navigate = useNavigate();
   //********************open and close Add Stock Modal***********************//

   const [stationOrderModal, setStationOrderModal] = useState(false);
   const openModal = () => {
       setStationOrderModal(true);
   };
   const closeModal= () => {
       setStationOrderModal(false);
   };

   //********************end of open and close Stock Modal**********************//

  const params = useParams();
  const stationOrderId = params.id;

// ================================== Fetching Station Orders Details =====================================
  
  const [stationName , setStationName] = useState();
  const [stationLocation , setStationLocation] = useState();
  const [stationManager , setStationManager] = useState();
  const [productQty , setProductQty] = useState();
  const [productKilo , setProductKilo] = useState();
  const [productType , setProductType] = useState();
  const [orderStatus , setOrderStatus] = useState();
  const [stationIdd , setStationIdd] = useState();
  const [productIdd , setProductIdd] = useState();
  

  const fetchingOrderDetails = () =>{
   let token = localStorage.getItem("token");
   axios({
    method : "GET",
    url : `https://sp-gas-api.onrender.com/api/v1/stOrder/${stationOrderId}`,
    headers : {
      Authorization : `Bearer ${token}`,
    },
   })
   .then((Response)=>{
     console.log(Response);
     setStationName(Response?.data?.StationId?.StationName);
     setStationLocation(Response?.data?.StationId?.Location);
     setStationManager(Response?.data?.StationId?.managerId?.FullNames);
     setProductKilo(Response?.data?.ProductId?.Kilograms);
     setProductType(Response?.data?.ProductId?.Type);
     setProductQty(Response?.data?.Quantity);
     setOrderStatus(Response?.data?.Status);
     setStationIdd(Response?.data?.StationId?._id);
     setProductIdd(Response?.data?.ProductId?._id);

   })
   .catch((error)=>{
    console.log(error);
   })
  }; 
  useEffect(()=>{
    fetchingOrderDetails();
  },[]);

// ================================== End Fetching Station Orders Details =====================================

// ================================== Approving Order ===========================================================

const ApproveOrder = () => {
      let token = localStorage.getItem("token");
      axios({
        method : "PATCH",
        url : `https://sp-gas-api.onrender.com/api/v1/stOrder/completeSt/${stationOrderId}`,
        data : {
          stationId : stationIdd ,
          productId : productIdd,
          quantity : Number(productQty),
        },
        headers : {
          Authorization :  `Bearer ${token}`,
        },
      })
      .then((Response)=>{
        console.log(Response);
        toast.success("Order Approved Succesfully");
        setTimeout(() => {
          navigate("/dashboard/adminstationorders");
        }, 2000);
      })
      .catch((error)=>{
        console.log(error);
        toast.error(error.message);
      })
};

// ================================== End Approving Order =======================================================

// ================================== Cancelling Order =========================================================

const CancelOrder = () => {
  let token = localStorage.getItem("token");
  axios({
    method : "PATCH",
    url : `https://sp-gas-api.onrender.com/api/v1/stOrder/cancelledSt/${stationOrderId}`,
    data : {
      stationId: stationIdd ,
      productId: productIdd,
      quantity: Number(productQty),
    },
    headers : {
      Authorization :  `Bearer ${token}`,
    },
  })
  .then((Response)=>{
    console.log(Response);
    toast.success("Order Declined");
    setTimeout(() => {
      navigate("/dashboard/adminstationorders");
    }, 2000);
  })
  .catch((error)=>{
    console.log(error);
    toast.error("failed to cancel Order");
  })
};
// ================================== End Cancelling Order =========================================================


//=========================Edit Quantity=====================================================

const handleEditQuantity = (e) => {

  if(productQty == ""){
    toast.error("State new quantity for the order");
    return;
  }

  e.preventDefault();
  let token = localStorage.getItem("token");

  axios({
    method : "PATCH",
    url : `https://sp-gas-api.onrender.com/api/v1/stOrder/${stationOrderId}`,
    data: {
      Quantity : productQty,
    },
    headers : {
      Authorization : `Bearer ${token}`,
      "content-type" : "application/json",
    },
  })
  .then((response) => {
    console.log(response, "Update Quantity");
    toast.success("Quantity Successfully Update");
    setTimeout(() => {
      navigate("/dashboard/adminstationorders");
    }, 2000);
  })
  .catch((error) => {
    console.log(error);
    toast.error(error.message);
  })
};

//========================= End Edit Quantity==================================================

 // ============================== Status Color ==================================================

 let backgroundColor = 'initial';
 let textColor  = 'initial';
  
switch (orderStatus) {
    case 'Approved':
      backgroundColor = 'green';
      textColor = 'white';
      break;
    case 'Cancelled':
      backgroundColor = 'red';
      textColor = 'white';
      break;
      case 'Pending':
      backgroundColor = 'yellow';
      textColor = 'black';
      break;
    default:
      break;
  }

// ============================== End Status Color ==================================================

  return (
    <div>
      <Card className={AdminStationOrders.container}>
                <div className={AdminStationOrders.titleContainer}>
                    <Link to='/dashboard/adminstationorders' className={AdminStationOrders.retButton}><IoMdArrowRoundBack className={AdminStationOrders.returnArrow}/></Link>  
                  <h1 className={AdminStationOrders.title}>
                     Station Order Details
                  </h1>
                </div>
                <div className={AdminStationOrders.main}>
                    <div className={AdminStationOrders.left}>
                      <h3 className={AdminStationOrders.leftTitle}>Station name</h3>
                      <p className={AdminStationOrders.leftName}> {stationName} </p>
                      <h3 className={AdminStationOrders.leftTitle}>Location</h3>
                      <p className={AdminStationOrders.leftName}> {stationLocation} </p>
                      <h3 className={AdminStationOrders.leftTitle}>Manager</h3>
                      <p className={AdminStationOrders.leftName}> {stationManager} </p> 
                    </div>
                    <div className={AdminStationOrders.right}>
                    <div className={AdminStationOrders .rightone}>
                         <h3 className={AdminStationOrders .rightTitle}>Order Detail</h3>
                       
                         {orderStatus !== "Approved" && orderStatus !== "Cancelled" && ( 
                            <button onClick={openModal}>edit quantity</button>
                         )}
                         {stationOrderModal && 
                    <div className={AdminStationOrders .middle}>
                        <Card className={AdminStationOrders .middleCard}>
                            <span className={AdminStationOrders .closeCard}>
                                <IoCloseCircleSharp className={AdminStationOrders .closeIcon} onClick={closeModal}/>
                            </span>
                                <TextField
                                    value={productQty}
                                    id="default-value"
                                    variant="outlined"
                                    sx={{
                                        mb: 2,
                                    }}
                                    onChange={(e)=>{
                                      setProductQty(e.target.value);
                                    }}
                                    />
                                     <div>
                                    <Button color="primary" variant="contained" onClick={handleEditQuantity}>
                                        Submit
                                    </Button>
                                    </div>
                        </Card>
                    </div>
                    }
                        </div>
                        <div className={AdminStationOrders.rightContent}>
                            <p> {productKilo} kg </p>
                            <p> {productType} </p>
                            <p> {productQty} Cylinders</p>
                        </div>
                          <h3 className={AdminStationOrders.status}> Status <span style={{backgroundColor, color: textColor }} >{orderStatus}</span> </h3>
                    </div>
                </div>
                {orderStatus !== "Approved" && orderStatus !== "Cancelled" && (
                   <section>  
                  <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={5}
                        variant="outlined"
                        className={AdminStationOrders.message}
                        sx={{
                          mb: 2,
                        }}
                      />

                  <div className={AdminStationOrders.footer}>
                    <button className={AdminStationOrders.btnedit} onClick={() => ApproveOrder(stationOrderId)}> 
                     <FaThumbsUp className={AdminStationOrders.btnicon}/>
                         approve
                    </button>
                    <button className={AdminStationOrders.btndelete} onClick={() => CancelOrder(stationOrderId)}>
                    <FaThumbsDown className={AdminStationOrders.btnicon}/>
                        decline
                    </button>
                </div>
                </section>
                )}
               
                <ToastContainer/>
      </Card>
    </div>
  )
}

export default AdminStationOrderDetail
