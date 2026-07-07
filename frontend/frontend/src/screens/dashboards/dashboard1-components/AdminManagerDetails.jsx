import React from 'react'
import managerdetail from "./AdminManagers.module.css";
import { Card } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { useState } from 'react';
import { MdPhotoCamera } from "react-icons/md";


function AdminManagerDetails() {

     // edit picture modal
     const [openEditPicture , setOpenEditPicture] = useState(false);
     function handleEditp()  {
            setOpenEditPicture(!openEditPicture);
     };
   
     // End edit picture modal

  // =================== fetching managers ====================================

  const navigate = useNavigate();
  const params = useParams();
  let managerId = params.id;

  const [managerImage , setManagerImage] = useState();
  const [managerFullNames , setManagerFullNames] = useState();
  const [managerIdentification , setManagerIdentification] = useState();
  const [managerPhone , setManagerPhone] = useState([]);
  const [managerEmail, setManagerEmail] = useState();

  const fetchMangersDetails = () => {
    let token = localStorage.getItem("token");
    axios({
      method : "GET",
      url : `https://sp-gas-api.onrender.com/api/v1/users/${managerId}`,
      headers : {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((Response)=>{
      // console.log(Response);
      setManagerFullNames(Response?.data?.data?.FullNames);
      setManagerIdentification(Response?.data?.data?.IdNumber);
      setManagerEmail(Response?.data?.data?.Email);
      setManagerPhone(Response?.data?.data?.PhoneNumber[0]);
      setManagerImage(Response?.data?.data?.Profile);
     
    })
    .catch((error)=>{
      console.log(error);
    })

  };

  useEffect(()=>{
       fetchMangersDetails();
  },[]);



    // =================== fetching managers ====================================

    // =================== Deleting managers ====================================

    const handleDeleteManager = (managerId) =>{
      if(window.confirm("Are You Sure you want to Delete This Tarrif ?")){
         let token = localStorage.getItem("token");
         axios({
             method : "DELETE",
             url : `https://sp-gas-api.onrender.com/api/v1/users/delete/${managerId}`,
             headers : {
                 Authorization : `Bearer ${token}`,
             },
         })
         .then((response) => {        
             console.log(response, "Response");
             toast.success("Manager Deleted Suceesfully");
             setTimeout(() => {
               navigate("/dashboard/adminmanagers");
             }, 2000);
           })
           .catch((error) => {
             console.log(error);
             toast.error(error.message);
           });
      }
     };

    // =================== END Deleting managers ====================================

    
  // =================== Edit manager Picture =======================================


   const [profile , setProfile] = useState();
   const submitProfile = (e) =>{
    let token = localStorage.getItem("token");
    e.preventDefault();
    let data = new FormData();
    data.append("profile", profile);
    // console.log(data , "ddddddddddddddddddddddddd");
    axios({
      method : "PATCH",
      url : "https://sp-gas-api.onrender.com/api/v1/auth/managers/profile",
      data : data,
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "multipart/form-data",
      },
    })
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
   }


   // =================== Edit manager Picture ======================================

  return (
    <div>
      <Card className={managerdetail.container}>
              <div className={managerdetail.cont}>
               <Link to='/dashboard/adminmanagers' className={managerdetail.retButton}><IoMdArrowRoundBack className={managerdetail.returnArrow}/></Link> 
              </div>
               <h1 className={managerdetail.title}>
                Manager Details
               </h1>
                <div className={managerdetail.main}>
                    <div className={managerdetail.left}>
                       <div className={managerdetail.photoHolder}>
                        <MdPhotoCamera className={managerdetail.updatePhoto} onClick={handleEditp} />
                        <img  className={managerdetail.photo} src={managerImage} alt="profile" />
                         {openEditPicture && 
                          <div className={managerdetail.modalc}>
                            <input type="file" className={managerdetail.inp} 
                              onChange={(e) => {
                                e.preventDefault();
                                setProfile(e.target.files[0]);
                              }}
                            />
                            <div onClick={() => setOpenEditPicture(false)}> <button onClick={submitProfile} className={managerdetail.sv} >Save</button></div> 
                          </div>
                          }
                       </div>
                    </div>
                    <div className={managerdetail.right}>

                        <div className={managerdetail.rgtcontent}><h4>Full Name:</h4> <p> {managerFullNames} </p></div>
                        <div className={managerdetail.rgtcontent}><h4>ID:</h4> <p> {managerIdentification} </p></div>
                        <div className={managerdetail.rgtcontent}><h4>Email:</h4> <p> {managerEmail} </p></div>
                        <div className={managerdetail.rgtcontent}><h4>Phone Number:</h4> <p> {managerPhone} </p></div>

                    <div className={managerdetail.footer}>
                    <Link to="/dashboard/admineditmanager" className={managerdetail.link}>
                    <button className={managerdetail.btnedit}> 
                     <MdEdit className={managerdetail.btnicon}/>
                         Edit
                    </button>
                    </Link>
                    <button className={managerdetail.btndelete}
                     onClick={() => handleDeleteManager(managerId)}
                    >
                    <MdDelete className={managerdetail.btnicon}/>
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

export default AdminManagerDetails
