import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { 
    Card , 
    TextField,
    MenuItem,
 } from "@material-ui/core";
import userdetails from "./AdminUserOrders.module.css";
import { RiShareForward2Fill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import userdetailsStyles from "./AdminUserOrders.module.css";

function AdminUserOrderDetails() {

  const navigate = useNavigate();
  
  // =================== FETCH Station =================================

  const [stationu , setStationu] = useState([]);
  const [stationId ,setStationId] = useState("");
  let token = localStorage.getItem("token");
    const fetchStations = () => {
       axios({
          method: "GET",
          url: "https://sp-gas-api.onrender.com/api/v1/stations",
          headers : {
              Authorization: `bearer ${token}`,
              "Content-Type" : "application/json; charset=utf-8", 
          },
       })
       .then((Response)=>{
          setStationu(Response.data.data);
        
       })
       .catch((error)=>{
          console.log(error);
       })
  }

  useEffect(()=>{
      fetchStations();
  },[]);

   // =================== END FETCH Station ===========================

  // ====================== Assign to  Station ================================

  const handleAssign = () =>{

    if(stationId == ""){
      toast.error("State the station to assign the order");
      return;
    }

    let token = localStorage.getItem("token");
    axios({
      method : "PUT",
      url : `https://sp-gas-api.onrender.com/api/v1/order/updateStation/${userOrderId}`, 
      headers : {
         Authorization : `Bearer ${token}`,
      },
      data : {
        StationId : stationId,
      },  
    })
    .then((Response)=>{
      toast.success("Order Assigned Successfully");
      setTimeout(() => {
        navigate("/dashboard/adminuserorders");
      }, 2000);
      console.log(Response);
    })
    .catch((error)=>{
      toast.error(error.message);
      console.log(error);
    })
  };

  // ====================== END Assign to  Station =============================


// -----===================-------   Fetch UserOrder detais   --------------=====================-------------

const params = useParams();
const userOrderId = params.id;
const [userProductu , setUserProductu] = useState([]);
const [userAddOn , setUserAddOn] = useState([]);
const [ClientName , setClientName] = useState();
const [ClientPhone , setClientPhone] = useState();
const [ClientEmail , setClientEmail] = useState();
const [ClientLocation , setClientLocation] = useState();
const [amount , setAmount] = useState();
const [driver , setDriver] = useState();
const [station, setStation] = useState();
const [evidence , setEvidence] = useState();
console.log(evidence ,"evvvvv");

const [paymentStatus , setPayementStatus] = useState();
console.log(paymentStatus ,"sttatatatatat");

const [userDetails, setUserDetails] = useState({ price: "" });


const [Datas , setDatas] = useState([]);
console.log(Datas , "objjjjjjjjjjjjjjjjjjjj");

const fetchUserOrdersDetails = () => {
  let token = localStorage.getItem("token");
  axios({
    method : "GET",
    url : `https://sp-gas-api.onrender.com/api/v1/order/${userOrderId}`,
    headers : {
      Authorization : `Bearer ${token}`, 
    },
  })
  .then((Response)=>{
    console.log(Response , "fffffffffffffffffffffff");
    setClientName(Response?.data?.CartId?.UserId?.FullNames);
    setClientPhone(Response?.data?.phoneNumber);
    setClientEmail(Response?.data?.CartId?.UserId?.Email);
    setClientLocation(Response?.data?.address);
    setUserProductu(Response?.data?.CartId?.products);
    setUserAddOn(Response?.data?.CartId?.addOns);
    setAmount(Response?.data?.TotalOrder);
    setDriver(Response?.data?.DriverId?.FullNames);
    setStation(Response?.data?.StationId?.StationName);
    setPayementStatus(Response?.data?.isPaid);
    setEvidence(Response?.data?.Evidence);

    setUserDetails(Response?.data?.userDetails || { price: "" });
    setDatas(Response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
};

useEffect(()=>{
  fetchUserOrdersDetails();
},[]);

const changedAmount = amount?.toLocaleString();

// -----===================------- END   Fetch UserOrder detais   --------------=====================-------------

const getStatusText = () => {
  return paymentStatus ? "Paid" : "Not Paid";
};

const getStatusClassName = () => {
  return paymentStatus ? userdetailsStyles.paid : userdetailsStyles.notPaid;
};

  return (
    <div>
        <Card className={userdetails.container}>
                <div className={userdetails.contain}>
                      <div className={userdetails.returnButton}>
                        <Link to='/dashboard/adminuserorders' className={userdetails.retButton}><IoMdArrowRoundBack className={userdetails.returnArrow}/></Link>  
                      </div> 
                      <h1 className={userdetails.title}>
                        User Order Details
                      </h1>
                </div>
                <div className={userdetails.main}>
                    <div className={userdetails.left}>
                    <h3 className={userdetails.leftTitle}>Client name</h3>
                    <p className={userdetails.leftName}> {ClientName} </p>
                    <h3 className={userdetails.leftTitle}>Phone Number</h3>
                    <p className={userdetails.leftName}> {ClientPhone} </p> 
                    <h3 className={userdetails.leftTitle}> Email </h3>
                    <p className={userdetails.leftName}> {ClientEmail} </p>  
                    <h3 className={userdetails.leftTitle}> Location </h3>
                    <p className={userdetails.leftName}> {ClientLocation} </p>
                    </div>
                    <div className={userdetails.right}>
                        <h3 className={userdetails.rightTitle}> Gas Bottles</h3>
                        {userProductu?.map((produc)=>{
                          return (
                            <div className={userdetails.rightContent}>
                            <p> {produc?.productId?.Kilograms} kg</p>
                            <p> {produc?.productId?.Type} </p>
                            <p> {produc?.quantity} Bottles</p>
                          </div>
                          )
                        })} 
                        <br />
                        <h4>Price Due : <span className={userdetails.price}>Rwfs {changedAmount}</span> </h4>
                        <br />
                        <h4> Payement Status : <span className={`${userDetails.price} ${getStatusClassName()}`}>  {getStatusText()} </span> </h4>
                        <br />
                        <h4>Assigned Driver : <span className={userdetails.price}> {driver}</span> </h4>
                        <br />
                        <h4>Assigned Station : <span className={userdetails.price}> {station}</span> </h4>

                    {!Datas.StationId && 
                    <section>
                            <h3 className={userdetails.rightTitlee}>Assign To Stations</h3>
                        <TextField
                            className={userdetails.label}
                            id="standard-select-number"
                            variant="outlined"
                            select
                            label="Choose Station"
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => {
                              e.preventDefault();
                              setStationId(e.target.value);
                            }}
                            >
                            {stationu.map((station) => ( 
                                <MenuItem  value={station._id}>
                                {station.StationName}
                                </MenuItem>
                            ))}
                        </TextField>
                         <button className={userdetails.sendToStation} onClick={handleAssign}>
                         <RiShareForward2Fill className={userdetails.sendIcn} />
                            Send To Station
                         </button>
                    </section>
                    }
                    </div>
                    <div>
                           <h3 className={userdetails.rightTitlhe}> AddOns </h3>
                       {userAddOn?.map((ad)=>{
                         return (
                           <div className={userdetails.rightContentt}>
                           <p> {ad?.addonId?.Name} </p>
                           <p> {ad?.Count} Pcs</p>
                           </div> 
                         )
                       })}
                    <h4 className={userdetails.evidenceText}> Evidence </h4>  
                    <img src={evidence} alt="Proof" className={userdetails.proof} />
                    </div> 
                </div>
               <ToastContainer/>
        </Card>    
    </div>
  )
}

export default AdminUserOrderDetails
