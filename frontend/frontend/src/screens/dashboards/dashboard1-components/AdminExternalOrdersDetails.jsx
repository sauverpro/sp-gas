import React from 'react'
import { Link } from 'react-router-dom';
import { 
    Card , 
    TextField,
    MenuItem,
 } from "@material-ui/core";
 import { IoMdArrowRoundBack } from "react-icons/io"
 import externaldetails from "./AdminExternalOrders.module.css";
 import { useParams } from 'react-router-dom';
 import { useState } from 'react';
 import { useEffect } from 'react';
 import axios from 'axios';

function AdminExternalOrdersDetails() {

  // ========================================== Getting external Orders Details  ========================================================

  const params = useParams();
  const externalId = params.id;

  const [fullName, setFullName] = useState();
  const [contact, setContact] = useState();
  const [receiptNumber , setReceiptNumber] = useState();
  const [price, setPrice] = useState(); 
  const [quantity, setQuantity] = useState();
  const [kilograms , setKilograms ] = useState();
  const [type, setType] = useState();
  const [station , setStation] = useState();
  const [paymentMethod , setPayementMethod] = useState();

  const fetchExternalOrdersDetails= () => {
    let token = localStorage.getItem("token");
    axios({
      method : "GET",
      url : `https://sp-gas-api.onrender.com/api/v1/extOrder/${externalId}`,
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json",
      },
    })
    .then((Response) => {
      console.log(Response, 'test7');
      setFullName(Response?.data?.FullName);
      setContact(Response?.data?.PhoneNumber);
      setQuantity(Response?.data?.Quantity);
      setReceiptNumber(Response?.data?.receiptNumber);
      setPrice(Response?.data?.Amount);
      setKilograms(Response?.data?.ProductId?.Kilograms);
      setType(Response?.data?.ProductId?.Type);
      setStation(Response?.data?.StationId?.StationName);
      setPayementMethod(Response?.data?.PaymentMethod);
    
    })
    .catch((error) => {
      console.log(error);
    })
  };
  useEffect(() => {
    fetchExternalOrdersDetails()
  }, []);

  const changedAmount = price?.toLocaleString();

// ========================================== End Getting external Orders Details  ======================================================== 


  return (
    <div>
     <Card className={externaldetails.container}>
                <div className={externaldetails.contain}>
                  <div className={externaldetails.returnButton}>
                    <Link to='/dashboard/adminexternalorders' className={externaldetails.retButton}><IoMdArrowRoundBack className={externaldetails.returnArrow}/></Link>  
                  </div> 
                  <h1 className={externaldetails.title}>
                    External Order Details
                  </h1>
                </div>
                <div className={externaldetails.main}>
                    <div className={externaldetails.left}>
                    <h3 className={externaldetails.leftTitle}> Client name </h3>
                    <p className={externaldetails.leftName}> {fullName} </p>
                    <h3 className={externaldetails.leftTitle}> Phone Number </h3>
                    <p className={externaldetails.leftName}> {contact} </p>
                    <h3 className={externaldetails.leftTitle}> Station  </h3>
                    <p className={externaldetails.leftName}> {station} </p>
                    </div>
                    <div className={externaldetails.right}>
                        <div className={externaldetails.rightTitlee}> <p>Kilograms</p> <p>Type</p> <p>Quantity</p> <p> Receipt Number </p></div>
                        <div className={externaldetails.rightContent}>
                            <p> {kilograms} kg</p>
                            <p> {type} </p>
                            <p className={externaldetails.cylinders}> {quantity} Cylinders</p>
                            <p> {receiptNumber}</p>
                        </div>
                        <div className={externaldetails.payment}>
                        <div className={externaldetails.status}><h3>Amount Payed</h3> <p> Rwfs {changedAmount} </p></div>
                        <div className={externaldetails.status}><h3>Payment Method</h3> <p className={externaldetails.method}> {paymentMethod} </p></div>
                        </div>
                    </div>
                </div>   
        </Card>  
    </div>
  )
}

export default AdminExternalOrdersDetails
