import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import adminadd from "./AdminAdd.module.css";
import {
    Card,
    CardContent,
    Divider,
    Box,
    Button,
    Grid,
    TextField,
    MenuItem,
  } from "@material-ui/core";
  import { MdOutlineNoteAdd } from "react-icons/md";
  import { CiCirclePlus } from "react-icons/ci";
  import { RxCrossCircled } from "react-icons/rx";
  import axios from "axios";
  import { IoMdArrowRoundBack } from "react-icons/io";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useNavigate } from "react-router-dom";


const AdminAddStock = () => {

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



  // ==============================  Submitting  Stock =================================

  const [product ,setProduct] = useState([]);
  const [quantit ,setQuantit] = useState("");
  const [purchasePrice , setPurchasePrice] = useState("");
  
  const submitStock = (e) => {
      e.preventDefault();

      if(product == ""){
        toast.error("State needed product");
        return;
      }
      if(quantit == ""){
        toast.error("State needed quantity");
        return;
      }
      if(purchasePrice == ""){
        toast.error("State the purchase price");
        return;
      }

      let token = localStorage.getItem("token");
      axios({
        method : "POST",
        url : "https://sp-gas-api.onrender.com/api/v1/adminStock/addStock",
        data : {
          productId : product,
          quantity : Number(quantit),
          purchasePrice : Number(purchasePrice), 
        },
        headers : {
          Authorization : `Bearer ${token}` ,
        "content-Type" : "application/json",
        },
      })
      .then((Response) => {
        toast.success("Stock Added Successfully")
        setTimeout(() => {
          navigate("/dashboard/adminstock");
        }, 2000);
        console.log(Response , "rrrrrrrrrrrrrrrrrrr");
      })
      .catch((error) => {
        toast.error(error.message);
         console.log(error);
      })
  };

  // ==============================  Submitting  Stock =================================  
  
  // ======================= adding input fields & Deleting Them =======================

 const [val, setVal] = useState([]);
 const handleAdd = () => {
  const abc = [...val,{}]
  setVal(abc)
 };

const handleDelete = (i) =>{
const deleteVal = [...val];
 deleteVal.splice(i,1)
 setVal(deleteVal);
}
  // ================  END adding input fields & Deleting Them =========================

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
            <Link to='/dashboard/adminstock' className={adminadd.retButton}><IoMdArrowRoundBack className={adminadd.returnArrow}/></Link> 
            <MdOutlineNoteAdd className={adminadd.icon}/>
             Add New Stock
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <form className={adminadd.formContainer}>  
       {val.map((item,i) =>{
       return (
        <div className={adminadd.inputContainer}>            
            <TextField
              className={adminadd.label}
              variant="outlined"
              select
              label="product"
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
          className={adminadd.qty}
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
          <TextField
          className={adminadd.qty}
              type="number"
              id="default-value"
              label="Purchase Price "
              variant="outlined"           
              sx={{
                mb: 2,
              }}
              onChange={(e)=>{
                setPurchasePrice(e.target.value);
              }}
            />   
            <RxCrossCircled className={adminadd.addInput} onClick={()=> handleDelete(i)} />
        </div>
        )
      })}
          <div className={adminadd.addDiv}> 
          Add New Item 
          <CiCirclePlus  className={adminadd.addInputt} onClick={() => handleAdd()}/>
          </div> 
            <div>
              <Button color="primary" variant="contained" onClick={submitStock}>
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
        <ToastContainer/>
      </Card>
        </Grid>
      </Grid>
     );
}
 
export default AdminAddStock;