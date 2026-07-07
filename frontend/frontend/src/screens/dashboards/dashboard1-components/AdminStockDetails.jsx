import { Card } from "@material-ui/core";
import admindetail from "./AdminAdd.module.css";
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

function AdminStockDetails() {
  const navigate = useNavigate();

  //========================= fetching stock details =================================
    const params = useParams();
    const stockId = params.id;

    const [stockImagee, setStockImagee] = useState();
    const [stockKilo, setStockKilo] = useState();
    const [Purchase , setPurchase] = useState();
    const [stockType , setStockTypee] = useState();
    const [fullCylinders , setFullCylinders] = useState();
    const [emptyCylinders , setEmptyCylinders] = useState();

    const fetchAdminStockDetails = () => {
         let token = localStorage.getItem("token");
         axios({
            method : "GET",
            url : `https://sp-gas-api.onrender.com/api/v1/adminStock/${stockId}`,
            headers : {
                Authorization : `Bearer ${token}`,
            },
         })
         .then((Response) =>{
            console.log(Response);
            setStockImagee(Response?.data?.productId?.Image);
            setStockKilo(Response?.data?.productId?.Kilograms);
            setStockTypee(Response?.data?.productId?.Type);
            setPurchase(Response?.data?.purchasePrice);
            setFullCylinders(Response?.data?.Full);
            setEmptyCylinders(Response?.data?.Empty);
         })
         .catch((error) => {
            console.log(error);
         })
    };

    useEffect(()=>{
       fetchAdminStockDetails();
    }, []);

   //==================   END fetching stock details =================================

   // =========================== Product Fetching  ==============================
   const [tarrifs , setTarrifs] = useState([]);
   let token = localStorage.getItem("token");
   const fetchTarrifs = () => {
       axios({
           method: "GET",
           url: "https://sp-gas-api.onrender.com/api/v1/product",
           headers : {
               Authorization : `Bearer ${token}` ,
               "Content-Type" : "application/json; charset=utf-8",
           }
 
       })
       .then((Response) =>{
           setTarrifs(Response.data.data);
           // console.log(Response ,"rrreeeeeeeeerrrr");
       })
       .catch((error) => {
           console.log(error);
       });
   }
 
   useEffect(()=>{
       fetchTarrifs();
   },[]);
 
 // =========================== END Product Fetching  ==========================

 const totalPurchase = Purchase * stockKilo ;
 const formattedTtotalPurchase = totalPurchase.toLocaleString();

   //==================   DELETING  stock  ===========================================

  const handleDeleteStock = (stockId) => {
   if(window.confirm("Are You Sure you want to Delete This Stock ?")){
    let token = localStorage.getItem("token");
    axios({
        method : "DELETE",
        url : `https://sp-gas-api.onrender.com/api/v1/adminStock/delete/${stockId}`,
        headers : {
            Authorization : `Bearer ${token}`,
        },
    })
    .then((response) => {        
        console.log(response, "Response");
        toast.success("Stock Deleted Suceesfully");
        setTimeout(() => {
          navigate("/dashboard/adminstock");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
 }
};

   //==================  END DELETING  stock  ========================================

  return (
    <div>    
    <Card className={admindetail.container}>     
                <div className={admindetail.returnButton}>
                  <Link to='/dashboard/adminstock' className={admindetail.retButton}><IoMdArrowRoundBack className={admindetail.returnArrow}/></Link>  
                </div> 
                 <h1 className={admindetail.title}>
                  Stock details
                 </h1>
                  <div className={admindetail.main}>
                      <div className={admindetail.left}>
                         <img src={stockImagee} alt="Image" className={admindetail.bottleImage} />
                      </div>
                      <div className={admindetail.right}>
                          <h1 className={admindetail.rightTitle}> type : {stockType}</h1>   
                          <div className={admindetail.rightContent}>
                              <p>Quantity </p>
                              <p> {stockKilo} Kg</p>
                          </div>
                          <div className={admindetail.rightContent}>
                              <p> Total Puchase Price </p>
                              <p> {formattedTtotalPurchase} Rwf</p>
                          </div>
                          <div className={admindetail.rightContent}>
                              <p> Full Cylinders </p>
                              <p> {fullCylinders} Pcs</p>
                          </div>
                          <div className={admindetail.rightContent}>
                              <p> Empty Cylinders </p>
                              <p> {emptyCylinders} Pcs</p>
                          </div>
                          <div className={admindetail.actionButtons}>
                              <Link to="/dashboard/admineditstock" className={admindetail.link}>
                              <button className={admindetail.btnedit}> 
                              <MdEdit className={admindetail.btnicon}/>
                                  Edit
                              </button>
                              </Link>
                              <button className={admindetail.btndelete} 
                               onClick={() => handleDeleteStock(stockId)}
                              >
                              <MdDelete className={admindetail.btnicon}/>
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

export default AdminStockDetails
