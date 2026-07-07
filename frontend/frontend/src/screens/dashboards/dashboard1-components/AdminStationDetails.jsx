import { Card ,
    TextField,
    MenuItem,
    Button, } from "@material-ui/core";
import stationdetails from "./AdminStations.module.css";
import { Link, useFetcher } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";

const AdminStationDetails = () => {


    //********************open and close Add Stock Modal***********************//

    const [stockModal, setStockModal] = useState(false);
    const openModal = () => {
        setStockModal(true);
    };
    const closeModal= () => {
        setStockModal(false);
    };

    //********************end of open and close Stock Modal**********************//
    const navigate = useNavigate();

    // ======================= Station Stock Fetching ================================== 
     
    const params = useParams();

    let stationId = params.id;
    
    const [stationStock, setStationStock] = useState([]); 
    const fetchStationStock = () =>{
       let token = localStorage.getItem("token");
       axios({
        method : "GET",
        url : `https://sp-gas-api.onrender.com/api/v1/stock/station/${stationId}`,
        headers : {
            Authorization : `Bearer ${token}`,
        }
       })
       .then((Response)=>{
        setStationStock(Response?.data); 
       })
       .catch((error)=>{
        console.log(error);
       });
    };
    useEffect(()=>{
     fetchStationStock();
    }, []);

    // ======================= END Station  Stock Fetching ============================== 

    // =======================   Station Details Fetching ================================== 

    const [stationName, setStationName] = useState();
    const [stationManager , setStationManager] = useState();
    const [stationLocation , setStationLocation] = useState();

    const fetchStationDetails = () =>{
        let token = localStorage.getItem("token");
        axios({
            method : "GET",
            url : `https://sp-gas-api.onrender.com/api/v1/stations/${stationId}`,
            headers : {
                Authorization : `Bearer ${token}`,
            },
        })
        .then((Response)=>{
            setStationLocation(Response?.data?.data?.Location);
            setStationName(Response?.data?.data?.StationName);
            setStationManager(Response?.data?.data?.managerId.FullNames);
        })
        .catch((error)=>{
            console.log(error);
        });
    };

    useEffect(()=>{
        fetchStationDetails();
    },[]);

    // =======================End  Station Details Fetching ================================

    // ======================= Delete Station ============ ============================== 

    const handleDeleteStation = (stationId) =>{
        if(window.confirm("Are you Sure yu want to delete this Station ?")){
            let token = localStorage.getItem("token");
            axios({
                method : "DELETE",
                url : `https://sp-gas-api.onrender.com/api/v1/stations/delete/${stationId}`,
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            })
            .then((Response)=>{
                console.log(Response);
                toast.success("Station Deleted Succesfully ");
                setTimeout(() => {
                    navigate("/dashboard/adminstations");
                  }, 2000);
            })
            .catch((error)=>{
                console.log(error);
                toast.error(error.message);
            });
        }
    };

    // ======================= Delete Station ============ ============================== 


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
            //   console.log(Response);
          })
          .catch((error) => {
              console.log(error);
          });
      };  
      useEffect(()=>{
          fetchTarrifs();
      },[]);
    
    // =========================== END Product Fetching  ==========================

    // ======================= Add Stock to Station ============ ============================== 
    
    const [productu ,setProductu] = useState([]);
    const [quantit ,setQuantit] = useState("");

    const handleAddStockToStation = (e) => {
        e.preventDefault();

        if(productu == ""){
            toast.error("State needed product");
            return;
        }
        if(quantit == ""){
            toast.error("State needed quantity for product");
            return;
        }

        let token = localStorage.getItem("token");
        axios({
            method : "POST",
            url : "https://sp-gas-api.onrender.com/api/v1/stock/addStock",
            data : {
                stationId : stationId,
                productId : productu,
                quantity : Number(quantit),
            },
            headers : {
                Authorization : `Bearer ${token}`,
                "content-Type" : "application/json",
            },
        })
        .then((Response)=>{
            console.log(Response ,"ddddddddddddddddddd");
            toast.success("Stock added to this station Successfully");
            setTimeout(() => {
                navigate("/dashboard/adminstations");
            }, 2000);
        })
        .catch((error)=>{
            toast.error(error.message);
            console.log(error);
        })
    };

    // ======================= END Add Stock to Station ============ ============================== 

    return ( 
        <div>
            <Card className={stationdetails.container}>
                <div className={stationdetails.titleContainer}>
                    <Link to='/dashboard/adminstations' className={stationdetails.retButton}><IoMdArrowRoundBack className={stationdetails.returnArrow}/></Link>  
                  <h1 className={stationdetails.title}>
                    Station Details
                  </h1>
                </div>
                <div className={stationdetails.main}>
                    <div className={stationdetails.left}>
                    <h3 className={stationdetails.leftTitle}>Station name </h3>
                    <p className={stationdetails.leftName}>  {stationName} </p>
                    <h3 className={stationdetails.leftTitle}>Manager </h3>
                    <p className={stationdetails.leftName}> {stationManager} </p> 
                    <h3 className={stationdetails.leftTitle}>Location </h3>
                    <p className={stationdetails.leftName}> {stationLocation} </p>
                    </div>
                    <div className={stationdetails.right}>
                           
                  <div className={stationdetails.rightone}>
                         <h3 className={stationdetails.rightTitle}>Stock</h3>
                         <button onClick={openModal}>add stock</button>
                         {stockModal && 
                    <div className={stationdetails.middle}>
                        <Card className={stationdetails.middleCard}>
                            <span className={stationdetails.closeCard}>
                                <IoCloseCircleSharp className={stationdetails.closeIcon} onClick={closeModal}/>
                            </span>
                            <TextField
                                variant="outlined"
                                select
                                label="product"
                                sx={{
                                    mb: 2,
                                }}
                                onChange={(e)=>{
                                    setProductu(e.target.value);
                                  }}
                                >
                                {tarrifs.map((product) => ( 
                                    <MenuItem  key={product._id} value={product._id}>
                                    {product?.Kilograms} kg , {product?.Type}
                                    </MenuItem>
                                ))}
                                </TextField>
                                <TextField
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
                                     <div>
                                    <Button color="primary" variant="contained" onClick={handleAddStockToStation}>
                                        Submit
                                    </Button>
                                    </div>
                        </Card>
                    </div>
                    }
                        </div>
                   {stationStock.map((stock)=>{
                    return (
                         <div className={stationdetails.rightContent}>
                            <p>  {stock?.productId?.Kilograms} kg</p>
                        
                            <div className={stationdetails.rightBottle}>
                              <div className={stationdetails.rightBottled}><p className={stationdetails.pi}>Empty </p> {stock.Full} Cylinders</div>
                              <div className={stationdetails.rightBottled}><p className={stationdetails.pi}>Full  </p> {stock.Empty} Cylinders</div>  
                            </div>
                        </div>
                    )
                   })}
    
                    </div>
                </div>
                <div className={stationdetails.footer}>
                    <Link to="/dashboard/admineditstation" className={stationdetails.link}>
                    <button className={stationdetails.btnedit}> 
                     <MdEdit className={stationdetails.btnicon}/>
                         Edit
                    </button>
                    </Link>
                    <button className={stationdetails.btndelete}  
                    onClick={()=> handleDeleteStation(stationId)}
                    >
                    <MdDelete className={stationdetails.btnicon}/>
                        Delete
                    </button>
                </div>
                <ToastContainer/>
            </Card>
        </div>
     );
}
 
export default AdminStationDetails;