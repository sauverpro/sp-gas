import React from 'react'
import { Card } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPhotoCamera } from "react-icons/md";
import driverDet from './DriverDetail.module.css'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DriverDetail() {

  const navigate = useNavigate();

  const param = useParams();
  const dereverId = param.id ;
  

  // ================= driver details fetching ====================================
  
  const [picture , setPicture] = useState();
  const [driverName , setDriverName] = useState();
  const [driverPhone , setDriverPhone] = useState();
  const [driverEmail , setDriverEmail] = useState();
  const [driverIdenti , setDriverIdenti] = useState();
  const [driverLocation , setDriverLocation] = useState();

  const fetchDriverDetails = () =>{
    let token = localStorage.getItem("token");
    axios({
      method : "GET",
      url : `https://sp-gas-api.onrender.com/api/v1/users/${dereverId}`,
      headers : {
        Authorization : `Bearer ${token}`,
      },
    })
    .then((Response)=>{
      console.log(Response);
      setDriverName(Response?.data?.data?.FullNames);
      setDriverIdenti(Response?.data?.data?.IdNumber);
      setDriverEmail(Response?.data?.data?.Email);
      setDriverPhone(Response?.data?.data?.PhoneNumber[0]);
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  useEffect(()=>{
    fetchDriverDetails();
  },[]);

  // ================= End driver details fetching ====================================

  // ================= Deleting  driver  ==============================================

  const handleDeleteDriver = (dereverId) =>{

    if(window.confirm("Are you Sure You want to Delete This Driver")){
      let token = localStorage.getItem("token");
        axios({
      method : "DELETE",
      url : `https://sp-gas-api.onrender.com/api/v1/users/delete/${dereverId}`,
      headers : {
        Authorization : `Bearer ${token}`,
      }
    })
    .then((Response)=>{
      console.log(Response);
      toast.success("Driver Deleted Succesfully ");
      setTimeout(() => {
        navigate("/dashboard/drivers");
      }, 2000); 
    })
    .catch((error)=>{
      console.log(error);
      toast.error(error.message);
    })
    }
  };
  
   // ============  END Deleting  driver  ==============================================

  return (
    <div>
      <Card className={driverDet.container}>
        <div className={driverDet.cont}>
        <Link to='/dashboard/drivers' className={driverDet.retButton}>
          <IoMdArrowRoundBack className={driverDet.returnArrow}/>
        </Link> 
        </div>
        <h1 className={driverDet.title}>
          Driver Details
        </h1>
          <div className={driverDet.main}>
              <div className={driverDet.left}>
                <div className={driverDet.photoHolder}>
                  <MdPhotoCamera className={driverDet.updatePhoto}/>    
                </div>
              </div>
              <div className={driverDet.right}>

                  <div className={driverDet.rgtcontent}><h4>Name</h4> <p> {driverName} </p></div>
                  <div className={driverDet.rgtcontent}><h4>Email</h4> <p> {driverEmail} </p></div>
                  <div className={driverDet.rgtcontent}><h4>ID number</h4> <p>{driverIdenti}</p></div>
                  <div className={driverDet.rgtcontent}><h4>Phone Number</h4> <p> {driverPhone} </p></div>

              <div className={driverDet.footer}>
                <Link to="/dashboard/editDriver" className={driverDet.link}>
                  <button className={driverDet.btnedit}> 
                    <MdEdit className={driverDet.btnicon}/>
                      Edit
                  </button>
              </Link>
              <button className={driverDet.btndelete}
              onClick={() =>handleDeleteDriver(dereverId)}
              >
              <MdDelete className={driverDet.btnicon}/>
                  Delete
              </button>
            </div>
              </div>
          </div>
          <ToastContainer/>
      </Card>
    </div>
  )
}

export default DriverDetail
