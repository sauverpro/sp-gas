import OrderingCSS from "../Section2/Ordering.module.css";
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";


function Ordering() {

  const navigate = useNavigate();
  const [tarrifLoading , setTarrifLoading] = useState(false);

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


// =========================== Product Fetching  ==============================

    const [tarrifs, setTarrifs] = useState([]);
    let token = localStorage.getItem("token");
    const fetchTarrifs = () => {
        setTarrifLoading(true);
        axios({
            method: "GET",
            url: "https://sp-gas-api.onrender.com/api/v1/product",
            headers : {
                Authorization : `Bearer ${token}` ,
                "Content-Type" : "application/json; charset=utf-8",
            },
        })
        .then((Response) =>{
            setTarrifLoading(false);
            setTarrifs(Response.data.data);
            console.log(Response);
        })
        .catch((error) => {
            setTarrifLoading(false);
            console.log(error);
        });
    };

    useEffect(()=>{
        fetchTarrifs();
    },[]);

// =========================== END Product Fetching  ==========================

  return (
    <div className={OrderingCSS.OrderingContent}>
      <div className={OrderingCSS.bottomSpace}></div>
      <div className={OrderingCSS.header}>
        <h1>
            gas cylinders available <br />
            <small>
            Here are all Gases Available For You To Buy !
            You Can Choose any type you want.
            </small>
        </h1>
      </div>
         <div className={OrderingCSS.GasesContainer}>
        <div className={OrderingCSS.GasColumn}>
          {tarrifLoading ? (<PuffLoader className={OrderingCSS.load} color="#08C25E" size="390"/>) : (
          <div className={OrderingCSS.GasRow}>
            {tarrifs.map((product)=>{
              return (
                <div className={OrderingCSS.GasCard}>
              <div className={OrderingCSS.GasBottle}>
                <img src={product.Image} alt="gas Bottle not displaying" className={OrderingCSS.productImage} />
              </div>
              <h4> {product.Type} </h4>
              <span>
                <span className={OrderingCSS.h2}>
                  <strong> {product.Kilograms} </strong>
                  <small>
                  {`${(tarriff.Price * product.Kilograms).toLocaleString()} Rwf`} 
                  </small>
                </span>
                  <button className={OrderingCSS.BuyButton}
                  onClick={() => navigate(`/PaymentPage/${product._id}`)}
                  >Buy</button>
              </span>
            </div>
              )
            })}

          </div>
           )}
        </div>
      </div>
    </div>
  );
}

export default Ordering;
