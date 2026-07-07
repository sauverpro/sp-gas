import React from 'react'
import details from "./AdminAddOns.module.css";
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


function AdminAddOnsDetails() {

  ////////////////////////Fetch addonDetail///////////////////////

  const params = useParams();
  const addonId = params.id;

  const [addonImage,setAddonImage] = useState();
  const [addonName, setAddonName] = useState();
  const [addonPrice, setAddonPrice] = useState();

  const fetchAddonDetail = () => {
    let token = localStorage.getItem("token");
    axios({
      method : "GET",
      url : `https://sp-gas-api.onrender.com/api/v1/addons/${addonId}`,
      headers : {
        Authorization : `Bearer ${token}`,
      }
    })
    .then((Response)=>{
      console.log(Response);
      setAddonImage(Response?.data?.data?.Image);
      setAddonName(Response?.data?.data?.Name);
      setAddonPrice(Response?.data?.data?.Price);
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  useEffect(()=> {
    fetchAddonDetail();
  }, []);

  const changedAddonPrice = addonPrice?.toLocaleString();
  ///////////////////////////////////////////////////////////////////////////////////
  ////////////////////////Delete addonDetail///////////////////////
  const handleDeleteAddon = (addonId) =>{
    axios({
      method: "DELETE",
      url: `https://sp-gas-api.onrender.com/api/v1/cart/delete/${addonId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((Response)=> {
      console.log(Response);
    })
    .catch(()=> {
      console.log(error);
    })
  }



  return (
   
    <div>
      <Card className={managerdetail.container}>
              <div className={managerdetail.cont}>
               <Link to='/dashboard/adminaddons' className={managerdetail.retButton}><IoMdArrowRoundBack className={managerdetail.returnArrow}/></Link> 
              </div>
               <h1 className={managerdetail.title}>
                AddOn Details
               </h1>
                <div className={managerdetail.main}>
                    <div className={managerdetail.left}>
                       <div className={managerdetail.photoHolder}>
                        <img  className={managerdetail.photo} src={addonImage} alt="Addon image" />
                       </div>
                    </div>
                    <div className={managerdetail.right}>

                        <div className={managerdetail.rgtcontent}><h4>Name: </h4> <p> {addonName}</p></div>
                        <div className={managerdetail.rgtcontent}><h4>Price: </h4> <p> Rwfs {changedAddonPrice} </p></div>
                      

                    <div className={managerdetail.footer}>
                    <Link to="/dashboard/admineditaddons" className={managerdetail.link}>
                    <button className={managerdetail.btnedit}> 
                     <MdEdit className={managerdetail.btnicon}/>
                         Edit
                    </button>
                    </Link>
                    <button className={managerdetail.btndelete}
                    onClick={()=> handleDeleteAddon(addonId)}
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

export default AdminAddOnsDetails
