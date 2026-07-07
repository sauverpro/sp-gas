import { Card } from "@material-ui/core";
import admTariff from "./AdminTariff.module.css";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCircle } from "react-icons/fa"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminViewTariff() {

    const navigate = useNavigate();
    // =========================== Unit Price Fetching  ==================================

 const [tarriff , setTarriff] = useState([]);
 const fetchTarriff = () => {
    let token = localStorage.getItem("token");
    axios({
        method : "GET",
        url: "https://sp-gas-api.onrender.com/api/v1/tariff/latest",
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json; charset=utf-8",
        }
    })
    .then((Response)=>{
        setTarriff(Response.data.data);
    })
    .catch((error)=>{
        console.log(error);
    })
 };
 useEffect(()=>{
    fetchTarriff();
 },[]);

// =========================== End Unit Price Fetching  ==============================
   

    // =========== tarrif details fetching =======================

    const params = useParams();
    let tarifId = params.id;
  
    const [tarrifImagee, setTarrifImagee] = useState();
    const [kilogramm, setKilogramm] = useState();
    const [typee , setTypee] = useState();

    const [proId , setProId] = useState();

    const fetchTarrifDetails = () =>{
         
        let token = localStorage.getItem("token");
        axios({
            method: "GET",
            url: `https://sp-gas-api.onrender.com/api/v1/product/${tarifId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response)=>{
              console.log(response);

            setTarrifImagee(response?.data?.data?.Image);
            setKilogramm(response?.data?.data?.Kilograms);
            setTypee(response?.data?.data?.Type);

            setProId(response?.data?.data?._id);
        })
        .catch((error)=>{
            console.log(error);
        });
    };

    useEffect(()=>{
        fetchTarrifDetails();
    }, []);

    // =========== END tarrif details fetching =======================

   



    // ============   Tarrif DELETE   ===================================
    const handleDeleteTarrif = (tarifId) =>{
     if(window.confirm("Are You Sure you want to Delete This Product ?")){
        let token = localStorage.getItem("token");
        axios({
            method : "DELETE",
            url : `https://sp-gas-api.onrender.com/api/v1/product/delete/${tarifId}`,
            headers : {
                Authorization : `Bearer ${token}`,
            },
        })
        .then((response) => {        
            console.log(response, "Response");
            toast.success("Product Deleted Suceesfully");
            setTimeout(() => {
              navigate("/dashboard/admintariff");
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
     }
    };

   // ============ tarrif DELETE End =================================

  return (
    <div>
      <Card className={admTariff.container}>
                
              <div className={admTariff.returnButton}>
                <Link to='/dashboard/admintariff' className={admTariff.retButton}><IoMdArrowRoundBack className={admTariff.returnArrow}/></Link>  
              </div> 
               <h1 className={admTariff.titllle}>
                Tarrif details
               </h1>
                <div className={admTariff.main}>
                    <div className={admTariff.left}>
                        <img src={tarrifImagee} className={admTariff.bottleImage}/> 
                    </div>
                    <div className={admTariff.right}>
                        <h1 className={admTariff.rightTitle}>Type : {typee}</h1>
                        <div className={admTariff.rightContent}>
                            <p>Color </p>
                            <span className={admTariff.spanContent}><FaCircle className={admTariff.spanIcon}/>Red</span>
                        </div>
                        <div className={admTariff.rightContent}>
                            <p>Quantity </p>
                            <p> {kilogramm} Kg</p>
                        </div>
                        <div className={admTariff.rightContent}>
                            <p> Total Price </p>
                            <p> {(tarriff.Price * kilogramm).toLocaleString()} Rwf</p>
                        </div>
                        <div className={admTariff.actionButtons}>
                            <button className={admTariff.btnedit} 
                            onClick={() => navigate(`/dashboard/adminedittarif/${tarriff?._id}`, {state:{kilo: kilogramm,tye:typee , id:proId}})}
                            > 
                            <MdEdit className={admTariff.btnicon}/>
                                Edit
                            </button>
                            <button className={admTariff.btndelete} 
                             onClick={() => handleDeleteTarrif(tarifId)}
                            >
                            <MdDelete className={admTariff.btnicon}/>
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

export default AdminViewTariff
