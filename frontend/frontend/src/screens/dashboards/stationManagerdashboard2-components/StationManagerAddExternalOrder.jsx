import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StationnagerExOrder from './StationManagerExternalOrder.module.css';
import {
    Card,
    CardContent,
    Divider,
    Box,
    TextField,
    Button,
    Grid,
    MenuItem,
  } from "@material-ui/core";
  import { MdOutlineNoteAdd } from "react-icons/md";
  import { IoMdArrowRoundBack } from "react-icons/io";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function StationManagerAddExternalOrder() {

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
             console.log(Response);
         })
         .catch((error) => {
             console.log(error);
         });
     };  
     useEffect(()=>{
         fetchTarrifs();
     },[]);
   
   // =========================== END Product Fetching  ==========================


    // =========================== Adding External Order ==============================

  let data = localStorage.getItem("data");
  let user = JSON.parse(data);
  const stationId = user.StationId;

  const [product, setProduct] = useState([]);
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState(""); 
  const [quantity, setQuantity] = useState("");
  const [receiptNumber , setReceiptNumber ] = useState("");
  const [payemntMethod , setPayemntMethod] = useState("");

  const handleAddExternalOrder = (e) => {

    e.preventDefault();

    if(fullName == ""){
      toast.error("State the name of client");
      return;
    }
    if(contact == ""){
      toast.error("State client contact");
      return;
    }if(price == ""){
      toast.error("State price paid");
      return;
    }if(product == ""){
      toast.error("Sate product ");
      return;
    }if(quantity == ""){
      toast.error("State quantity");
      return;
    }if(receiptNumber == ""){
      toast.error("State reciept number");
      return;
    }if(payemntMethod == ""){
      toast.error("State payment method used");
      return;
    }

    let token = localStorage.getItem("token");
    axios({
      method : "POST",
      url : "https://sp-gas-api.onrender.com/api/v1/extOrder/addExtOrder",
      data : {
        StationId : stationId,
        FullName : fullName,
        PhoneNumber : contact,
        Quantity : Number(quantity),
        Amount : Number(price),
        receiptNumber: receiptNumber,
        ProductId : product,
        PaymentMethod : payemntMethod,
      },
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json",
      },
    })
    .then((Response) => {
      toast.success("External Order Registered Successfully");
      setTimeout(() => {
        navigate("/dashboard/stationmanagerexternalorder");
      }, 2000);
      console.log(Response);
    })
    .catch((error) => {
      toast.error(error.message);
      console.log(error);
    })
  };
  // =========================== END Adding External Order ==============================






  return (
    <Grid container spacing={0}>
    <Grid item lg={12} md={12} xs={12}>
    <Card
    variant="outlined"
    sx={{
      p: 0,
    }}
    className={StationnagerExOrder.container}
  > 
    <Box
      sx={{
        padding: "15px 30px",
      }}
      display="flex"
      alignItems="center"
      className={StationnagerExOrder.header}
    >
    
        <div className={StationnagerExOrder.returnButton}>
          <Link to='/dashboard/stationmanagerexternalorder' className={StationnagerExOrder.retButton}><IoMdArrowRoundBack className={StationnagerExOrder.returnArrow}/></Link>  
        </div>
        <MdOutlineNoteAdd className={StationnagerExOrder.icon}/>
         Add External Order
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={StationnagerExOrder.stationform}>
      <TextField
          type="text"
          id="default-value"
          label="Full Name"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />

       <TextField
          type="text"
          id="outlined-password-input"
          label="Phone Number"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
          onChange={(e) => {
            setContact(e.target.value);
          }}
          className={StationnagerExOrder.field}
        />
         <TextField
              type="number"
              fullWidth
              id="standard-select-number"
              variant="outlined"
              label="Amount"
              sx={{
                mb: 2,
              }}  
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className={StationnagerExOrder.field}
            />
           

            <TextField
              type="text"
              fullWidth
              id="standard-select-number"
              variant="outlined"
              select
              label="Product"
              sx={{
                mb: 2,
              }}  
              onChange={(e) =>{
                setProduct(e.target.value);
              }}
              className={StationnagerExOrder.field}
            >
              {tarrifs.map((product) => ( 
                <MenuItem  key={product._id} value={product._id}>
                 {product.Kilograms} kg , {product.Type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              fullWidth
              id="standard-select-number"
              variant="outlined"
              label="Quantity"
              sx={{
                mb: 2,
              }}  
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              className={StationnagerExOrder.field}
            />
           
            <TextField
              type="text"
              fullWidth
              id="standard-select-number"
              variant="outlined"
              label="Receipt number"
              sx={{
                mb: 2,
              }}  
              className={StationnagerExOrder.field}
              onChange={(e) => {
                setReceiptNumber(e.target.value);
              }}
            />

           <TextField
              type="text"
              fullWidth
              id="standard-select-number"
              variant="outlined"
              label="Payement Method"
              sx={{
                mb: 2,
              }}  
              className={StationnagerExOrder.field}
              onChange={(e) => {
                setPayemntMethod(e.target.value);
              }}
            />
           
    
        <div className={StationnagerExOrder.buttonContainer}>
          <Button color="primary" variant="contained" onClick={handleAddExternalOrder}>
            Submit
          </Button>
        </div>
      </form>
    </CardContent>
    <ToastContainer/>
  </Card>
    </Grid>
  </Grid>
  )
}

export default StationManagerAddExternalOrder
