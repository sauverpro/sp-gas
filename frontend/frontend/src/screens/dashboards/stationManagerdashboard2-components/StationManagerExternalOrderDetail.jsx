import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
    Card , 
    TextField,
    MenuItem,
 } from "@material-ui/core";
 import { IoMdArrowRoundBack } from "react-icons/io";
import StationnagerExOrder from './StationManagerExternalOrder.module.css';

function StationManagerExternalOrderDetail() {


  // ========================================== Getting external Orders Details  ========================================================

    const params = useParams();
    const stationManaDetailId = params.id;

    const [fullName, setFullName] = useState();
    const [contact, setContact] = useState();
    const [price, setPrice] = useState(); 
    const [quantity, setQuantity] = useState();
    const [kilograms , setKilograms ] = useState();
    const [type, setType] = useState();
    const [paye , setPaye] = useState();

    const fetchManaExternalOrdersDetails= () => {
      let token = localStorage.getItem("token");
      axios({
        method : "GET",
        url : `https://sp-gas-api.onrender.com/api/v1/extOrder/${stationManaDetailId}`,
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json",
        },
      })
      .then((Response) => {
        console.log(Response, 'testtttttttttttttttt');
        setFullName(Response?.data?.FullName);
        setContact(Response?.data?.PhoneNumber);
        setPrice(Response?.data?.Amount);
        setQuantity(Response?.data?.Quantity);
        setKilograms(Response?.data?.ProductId?.Kilograms);
        setType(Response?.data?.ProductId?.Type);
        setPaye(Response?.data?.PaymentMethod);
      }) 
      .catch((error) => {
        console.log(error);
      })
    };
    useEffect(() => {
      fetchManaExternalOrdersDetails()
    }, []);

 // ========================================== End Getting external Orders Details  ========================================================    

  return (
    <div>

      <Card className={StationnagerExOrder.container}>
        
                <div className={StationnagerExOrder.retContainer}>
                  <div className={StationnagerExOrder.returnButton}>
                  <Link to='/dashboard/stationmanagerexternalorder' className={StationnagerExOrder.retButton}><IoMdArrowRoundBack className={StationnagerExOrder.returnArrow}/></Link>  
                  </div>
                  <h1 className={StationnagerExOrder.title}>
                    External Order Details
                  </h1>
                </div>
                <div className={StationnagerExOrder.main}>
                    <div className={StationnagerExOrder.left}>
                      <div>
                        <h3 className={StationnagerExOrder.leftTitle}>Client name : </h3>
                        <p className={StationnagerExOrder.leftName}>{fullName}</p>
                      </div>
                      <div>
                      <h3 className={StationnagerExOrder.leftTitle}>Phone Number :</h3>
                      <p className={StationnagerExOrder.leftName}>{contact}</p> 
                    </div>
                    </div>
                    <div className={StationnagerExOrder.right}>
                        <div className={StationnagerExOrder.rightTitlee}> <p>Kilograms</p> <p>Type</p>  <p>Quantity</p> <p>Price</p></div>
                        <div className={StationnagerExOrder.rightContent}>
                            <p>{kilograms}</p>
                            <p>{type}</p>
                            <p className={StationnagerExOrder.cylinders}>{quantity}</p>
                            <p> {price?.toLocaleString()}</p>
                        </div>
                        <div className={StationnagerExOrder.payment}>
                        <div className={StationnagerExOrder.status}><h3>Payment Method </h3> <p className={StationnagerExOrder.method}> {paye} </p></div>
                        </div>
                    </div>
                </div>
               
        </Card>  
    </div>

  )
}

export default StationManagerExternalOrderDetail
