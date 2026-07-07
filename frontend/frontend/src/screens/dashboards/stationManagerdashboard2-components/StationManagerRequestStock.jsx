import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import staMaReqStock from './StationManagerRequestStock.module.css'
import { MdOutlineNoteAdd } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function StationManagerRequestStock() {

  
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
  
  // =========================== END Product Fetching  ==============================


   // ==============================  Submitting  Stock =================================

   const [product ,setProduct] = useState([]);
   const [quantit ,setQuantit] = useState("");

   let data = localStorage.getItem("data");
   let user = JSON.parse(data);
   let sitationId = user.StationId;
   
   const requestStock = (e) => {

       e.preventDefault();

       if(product == ""){
        toast.error("You must add the Product you want");
       return;
       }
       if(quantit == ""){
        toast.error("You must add the Quantity for your Product");
        return;
       }

       let token = localStorage.getItem("token");
       axios({
         method : "POST",
         url : "https://sp-gas-api.onrender.com/api/v1/stOrder/addStOrder",
         data : {    
           StationId : sitationId,
           ProductId : product,
           Quantity : Number(quantit),
         },
         headers : {
           Authorization : `Bearer ${token}` ,
         "content-Type" : "application/json",
         },
       })
       .then((Response) => {
         toast.success("Stock Requested Successfully");
         setTimeout(() => {
          navigate("/dashboard/stationmanagerrequestedstock");
         }, 2000);
          console.log(Response);
       })
       .catch((error) => {
         toast.error(error.message);
          console.log(error);
       })
   };
 
   // ==============================  Request Stock  Stock =================================  


// ==================END adding input fields & Deleting Them ========================================

 const [val, setVal] = useState([]);
 const handleAdd = () => {
  const abc = [...val,{}]
  setVal(abc)
 };

const handleDelete = (i) =>{
const deleteVal = [...val];
 deleteVal.splice(i,1)
 setVal(deleteVal);
};

// ==================END adding input fields & Deleting Them ========================================

      return ( 
          <Grid container spacing={0}>
          <Grid item lg={12} md={12} xs={12}>
          <Card
          variant="outlined"
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              padding: "15px 30px",
            }}
            display="flex"
            alignItems="center"
          >
              <MdOutlineNoteAdd className={staMaReqStock.icon}/>
               Add Request Stock
          </Box>
          <Divider />
          <CardContent
            sx={{
              padding: "30px",
            }}
          >
            <form className={staMaReqStock.formContainer}>  

  {val.map((item,i) =>{
    return (
       <div className={staMaReqStock.inputContainer}>            
              <TextField
                className={staMaReqStock.label}
                required
                name='product'
                id="standard-select-number"
                variant="outlined"
                select
                label="Product"
                sx={{
                  mb: 2,
                }}
                onChange={(e)=>{
                  setProduct(e.target.value);
                }}
              >
                {tarrifs.map((product) => ( 
                <MenuItem  key={product._id} value={product._id}>
                 {product.Kilograms} kg , {product.Type}
                </MenuItem>
              ))}
              </TextField>
            <TextField
            className={staMaReqStock.qty}
                required
                name='quantity'
                type="number"
                id="default-value"
                label="Qty"
                variant="outlined"
                sx={{
                  mb: 2,
                }}
                onChange={(e)=>{
                  setQuantit(e.target.value);
                }}
              />
           

              <RxCrossCircled className={staMaReqStock.addInput} onClick={()=> handleDelete(i)} />
       </div>
    )
  })} 
  <div className={staMaReqStock.addDiv}> Add New Item<CiCirclePlus  className={staMaReqStock.addInputt} onClick={() => handleAdd()}/>
            </div> 
              <div>
                <Button color="primary" variant="contained" className={staMaReqStock.subButt} onClick={requestStock}>
                  Submit
                </Button>
              </div>
            </form>
            <ToastContainer/>
          </CardContent>
        </Card>
          </Grid>
        </Grid>
       );
  
}

export default StationManagerRequestStock
