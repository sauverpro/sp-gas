import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import admTariff from "./AdminTariff.module.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useParams,useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  Divider,
  Box,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


function AdminEditTariff() { 

  const navigate = useNavigate();

  const location = useLocation();
  const passeData = location.state;
  console.log("passed",passeData);

  const idd = passeData.id;
  console.log(idd,"paaaaaaaaaaaaaa");
  

  const [tarrifImagee, setTarrifImagee] = useState();
  const [kilogramm, setKilogramm] = useState();
  const [typee , setTypee] = useState();
  // const [productId, setProductId] = useState();

  const fetchTarrifDetails = () =>{
       
      let token = localStorage.getItem("token");
     
      axios({
          method: "GET",
          url: `https://sp-gas-api.onrender.com/api/v1/product/${idd}`,
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
      .then((response)=>{
            console.log(response , "jjjjjjjjjjjj");

          setTarrifImagee(response?.data?.data?.Image);
          setKilogramm(response?.data?.data?.Kilograms);
          setTypee(response?.data?.data?.Type);
        
      })
      .catch((error)=>{
          console.log(error);
      });
  };

  useEffect(()=>{
      fetchTarrifDetails();
  }, []);

  // =========== END tarrif details fetching =======================
  // =========== Edit tarrif =======================

  const handleImage = (e) => {
    e.preventDefault();
    setTarrifImagee(e.target.files[0]);
}
  
    const handleEdittarrif = (e) =>{

      e.preventDefault();
      
      let token = localStorage.getItem("token");

      const formData = new FormData ();
      formData.append("Image" ,tarrifImagee);
      formData.append("Kilograms", kilogramm);
      formData.append("Type", typee);

      axios({
        method : "PATCH",
        url : `https://sp-gas-api.onrender.com/api/v1/product/${idd}`,
        data : formData,
        headers : {
          Authorization : `Bearer ${token}`,
         "Content-Type" : "multipart/form-data",
        }
      })
      .then((response) =>{
        console.log(response);
        toast.success("Product Update Suceesfully");
        setTimeout(() => {
          navigate("/dashboard/admintariff");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      })
    }

  // =========== END tarrif edit tarrif  ===========

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
        <Link to='/dashboard/admintariffdetail' className={admTariff.retButton}><IoMdArrowRoundBack className={admTariff.returnArrow}/></Link> 
        <BiSolidEdit className={admTariff.editicon}/>
         Edit Tarrif
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form className={admTariff.stationform}>
        <TextField
          id="outlined-password-input"
          type='File'
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
          onChange={(e) => handleImage(e)}
        />

       <TextField
          value={typee}
          id="outlined-password-input"
          // type='text'
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
         onChange={(e) => {setTypee(e.target.value)}}
        />
        {console.log(typee, "type!!!")}
          
       <TextField
       value={kilogramm}  
          id="outlined-password-input"
          // type='number'
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
          }}
          onChange={(e) => {setKilogramm(e.target.value)}}
        />
        {console.log(kilogramm, "quantity!!!")}
        <div>
          <Button onClick={handleEdittarrif} color="primary" variant="contained" className={admTariff.updateTariff}>
            Update Tarrif
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

export default AdminEditTariff
