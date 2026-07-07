import priceTable from "./TablePrice.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"




function TablePrice() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleOrderButtonClick = () => {
    if(isLoggedIn) {
      navigate('/Ordering');
      }
      else{
           navigate('/Login');
      }
  };



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
        // setTarrifLoadig(true);
        axios({
            method: "GET",
            url: "https://sp-gas-api.onrender.com/api/v1/product",
            headers : {
                Authorization : `Bearer ${token}` ,
                "Content-Type" : "application/json; charset=utf-8",
            }
        })
        .then((Response) =>{
            // setTarrifLoadig(false);
            setTarrifs(Response.data.data);
            console.log(Response);
        })
        .catch((error) => {
            // setTarrifLoadig(false);
            console.log(error);
        });
    }

    useEffect(()=>{
        fetchTarrifs();
    },[]);

// =========================== END Product Fetching  ==========================






  return (
    <div className={priceTable.tableContainer} id="TablePrice">
      <div className={priceTable.container}>
        <div className={priceTable.tableDescr}>
          <h1>our prices</h1>
          <p>
            Depending on the standard of your life-style, SP Gas Rwanda has not
            forgot to establish the convenience and affordable prices, so that
            everyone can fit in services.
          </p>
        </div>
        
        <div className={priceTable.scroll}>
          <div className={priceTable.Card}>
          
              <div className={priceTable.CardRow1}>
              <span>size</span>
              {tarrifs.map((land)=>{
             return (  
              <span> {land.Kilograms} kg  </span>   
                 )
                })} 
            </div>    
              <div className={priceTable.CardRow2}>
              <span>image</span>
              {tarrifs.map((image)=>{
              return (
              <span> <img src={image.Image} className={priceTable.ifoto} /> </span>
                )
              })}
            </div>

            <div className={priceTable.CardRow3}>
              <span>price</span>
            {tarrifs.map((price)=>{
              return (
                 <span>
                {`${(tarriff.Price * price.Kilograms).toLocaleString()} Rwf`} 
                 </span>
              )
            })}
            </div>
            <div className={priceTable.CardRow4}>
              <span>type</span>
              {tarrifs.map((type)=>{
                return (
                  <span className={priceTable.descri}> {type.Type} </span>
                )
              })}
            </div>
          </div>
        </div>
          <button onClick={handleOrderButtonClick} className={priceTable.orderButton}>order now</button>
      </div>
    </div>
  );
}

export default TablePrice;
