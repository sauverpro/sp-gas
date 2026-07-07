import React from "react";
import { Link } from "react-router-dom";
import add from "./AdminStations.module.css";
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
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineNoteAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";


const AdminAddStations = () => {




  const navigate = useNavigate();
  const [stationName, setStationName] = useState("");
  const [stationManager, setStationManager] = useState([]);
  const [sitationManager, setSitationManager] = useState("");
  const [stationLocation, setStationLocation] = useState("");



   // ===========================   Fetching managers ================================


   const fetchManage = () =>{
    let token = localStorage.getItem("token");
    axios({
      method : "GET",
      url : "https://sp-gas-api.onrender.com/api/v1/auth/managers",
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json; charset=utf-8", 
      }
    })
    .then((Response) =>{
      console.log(Response);
      setStationManager(Response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
};
useEffect(()=>{
  fetchManage();
},[]);


   // ===========================   END Fetching managers ================================


 // ===========================   Submitting Station ================================
    
  const submitStation = (e) => {

    e.preventDefault();

    if(stationName == ""){
      toast.error("State the name of new station");
      return;
    }
    if(sitationManager == ""){
      toast.error("State name of the station manager");
    }
    if(stationLocation == ""){
      toast.error("State location of the station");
      return;
    }

    let token = localStorage.getItem("token");
    axios({
       method : "POST",
       url: "https://sp-gas-api.onrender.com/api/v1/stations/register",  
       data : {
        StationName : stationName,
        Location : stationLocation,
        Manager : sitationManager,
      },
      headers : {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((Response)=>{
      toast.success("Station Added Succesfully");
      console.log(Response);
      setTimeout(() => {
        navigate("/dashboard/adminstations");
      }, 2000);
    })
    .catch((error)=>{
      console.log(error);
      toast.error(error.message);
    })
  };
      
 // ===========================  END Submitting Station ================================    
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
            
            <Link to='/dashboard/adminstations' className={add.retButton}><IoMdArrowRoundBack className={add.returnArrow}/></Link>
            <MdOutlineNoteAdd className={add.icon}/>
             Add New Station
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <form className={add.stationform}>
          <TextField
              id="default-value"
              label="Station Name"
              variant="outlined"
              defaultValue="SP GAS Gatenga"
              fullWidth
              sx={{
                mb: 2,
              }}

              onChange={(e) => {
                e.preventDefault();
                setStationName(e.target.value);
              }}

            />

              <TextField
              fullWidth
              id="standard-select-number"
              variant="outlined"
              select
              label="Manager"
              sx={{
                mb: 2,
              }}

              onChange={(e) => {
                e.preventDefault();
                setSitationManager(e.target.value);
              }}
            >
              {stationManager.map((manager) => (
                <MenuItem key={manager._id} value={manager._id}>
                  {manager.FullNames}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-password-input"
              label="Location"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}            
              onChange={(e) => {
                e.preventDefault();
                setStationLocation(e.target.value);
              }}             
            />   
            <div>
              <Button color="primary" variant="contained" onClick={submitStation}>
                Submit
              </Button>
            </div>
            <ToastContainer />
          </form>
        </CardContent>
      </Card>
        </Grid>
      </Grid>
     );
}
 
export default AdminAddStations;