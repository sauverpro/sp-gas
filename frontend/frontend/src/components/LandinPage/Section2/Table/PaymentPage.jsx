import PaymentPageCSS from "../../Section2/Table/PaymentPage.module.css";
import Payment from "../../../images/pay-removebg.png";
import { useState } from "react";
import { useEffect } from "react";
import Notiflix from 'notiflix';
import { useParams } from "react-router-dom";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function PaymentPage() {

  const navigate = useNavigate();

  // =========================== Unit Price Fetching  ==================================

    const [unitPrice , setUnitPrice] = useState([]);
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
        setUnitPrice(Response.data.data);
       })
       .catch((error)=>{
           console.log(error);
       })
    };
    useEffect(()=>{
       fetchTarriff();
    },[]);
   
   // =========================== End Unit Price Fetching  ==============================

  // =========== tarrif details fetching ================================================
   
       const params = useParams();
       let tarifId = params.id;
     
       const [tarrifImagee, setTarrifImagee] = useState();
       const [kilogramm, setKilogramm] = useState();
       const [typee , setTypee] = useState();

       const [taId , setTaId] = useState();


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
               
               setTarrifImagee(response?.data?.data?.Image);
               setKilogramm(response?.data?.data?.Kilograms);
               setTypee(response?.data?.data?.Type);

               setTaId(response?.data?.data?._id);
           })
           .catch((error)=>{
               console.log(error);
           });
       };
   
       useEffect(()=>{
           fetchTarrifDetails();
       },);
   
 // =========== END tarrif details fetching =========================================

// =============================    Fetch  Addons ====================================

 const [addonsLoading, setAddonsLoading] = useState(false);
 const [addons, setAddons] = useState([]);
 const fetchAddons = () => {
   setAddonsLoading(true);
   let token = localStorage.getItem("token");
   axios({
     method: "GET",
     url:"https://sp-gas-api.onrender.com/api/v1/addons/",
     headers:{
       Authorization : `Bearer ${token}`,
       "Content-Type" : "application/json",   
      },
   })
   .then((Response) =>{
     setAddonsLoading(false);
     setAddons(Response.data.data);
   })
   .catch((error) =>{
     console.log(error);
     setAddonsLoading(false);
   })
 }
 useEffect(() =>{
   fetchAddons();
 },[]);
  
// =============================   End Fetch Addons ====================================   

// =============================    Fetch Delivery Fees ====================================

const [deliveryFee , setDeliveryFee] = useState([]);

const fetchDelivery = () =>{
  let token = localStorage.getItem("token");
      axios({
        method : "GET",
        url : "https://sp-gas-api.onrender.com/api/v1/deliveryfee/getAllDelFee",
        headers : {
          Authorization : `Bearer ${token}`,
        },
      })
      .then((Response)=>{
        setDeliveryFee(Response?.data?.Amount[0]?.Amount);
      })
      .catch((error)=>{
        console.log(error);
      })
}
useEffect(()=>{
   fetchDelivery();
},[]);

// =============================  End  Fetch Delivery Fees ====================================


// ===============================================================================================================
  const [count, setCount] = useState(1);
  const price = unitPrice.Price *  kilogramm ;
   
  const [totalPrice, setTotalPrice] = useState(count * price + deliveryFee);
  const [Price, setPrice] = useState(count * price);

  const handleCountChange = (e) => {
    
 
    const { value } = e.target;
    setCount(value !== "" ? parseInt(value, 10) : "");
  };

  // =============== Update totalPrice whenever count or price changes ===============================
   const [deliveryChoice, setDeliveryChoice] = useState("Cash");

    useEffect(() => {
    setPrice(count * price);
  }, [count, price ]);

  useEffect(() => {
    const deliveryAmount = deliveryChoice === "Cash" ? deliveryFee : 0;
    setTotalPrice(Price + deliveryAmount);
  }, [ deliveryChoice , deliveryFee , Price]);

  const handleDeliveryChoiceChange = (e) => {
    setDeliveryChoice(e.target.value);
  };

  const handlePaymentButtonClick = () => {
    Notiflix.Confirm.show(
      'Confirm Order',
      'Are you sure you want to proceed with the Order?',
      'Yes, Proceed',
      'Cancel',
      function () {
        Notiflix.Report.success('Order Sent Successfully', 'Your Order is being processed You Can Now Pay !', 'OK');
      },
      function () {
        Notiflix.Report.info('Order Cancelled', 'Your order has been canceled You Dont have to pay !', 'OK');
      }
    );
  };

// =================================================================================================================

// =========================================== Checkout Process ====================================================

 const [selectedAddons, setSelectedAddons] = useState([]);
 const [Locationn , setLocationn] = useState("");
 const [PhoneNumberr , setPhoneNumberr] = useState("");
 const [Telephonee , setTelephonee] = useState("");

 // Update the location state when the input value changes
 const handleLocationChange = (e) => {
  setLocationn(e.target.value);
};

 // Update the Telephone state when the input value changes
 const handleTelephoneChange = (e) => {
  setTelephonee(e.target.value);
};

 // Update the phonenumber state when the input value changes
 const handlePhoneNumberChange = (e) => {
  setPhoneNumberr(e.target.value);
};


// ======================= Handle AddOn =============================================


const handleCheckboxChange = (addonId, isChecked , price) => {
  setSelectedAddons((prevSelectedAddons) => {
    const updatedAddons = {
      ...prevSelectedAddons,
      [addonId]: {
        ...prevSelectedAddons[addonId],
        selected: isChecked,
        price: price,
        total: isChecked ? (prevSelectedAddons[addonId]?.count || 0) * price : 0,
      },
    };
    // Update totalPrice based on selected addons and deliveryFee

    const selectedAddonsTotal = Object.values(updatedAddons)
      .filter((addon) => addon.selected)
      .reduce((total, addon) => total + addon.total, 0);

    setTotalPrice(selectedAddonsTotal + Price + deliveryFee);
    return updatedAddons;

  });
};

const handleCountAddChange = (addonId, count , price) => {
  setSelectedAddons((prevSelectedAddons) => {
    const updatedAddons = {
      ...prevSelectedAddons,
      [addonId]: {
        ...prevSelectedAddons[addonId],
        count: Number(count),
        total: prevSelectedAddons[addonId]?.selected ? Number(count) * price : 0,
        price: price,
      },
    };

   // Update totalPrice based on selected addons and deliveryFee

    const selectedAddonsTotal = Object.values(updatedAddons)
      .filter((addon) => addon.selected)
      .reduce((total, addon) => total + addon.total, 0);

    setTotalPrice(selectedAddonsTotal + Price + deliveryFee);
    return updatedAddons;

  });
};


// ========================== End Handle Addon ======================================

 const handleCheckout = (e) => {
  
  e.preventDefault();
  if(count <= 0){
    toast.error("invalid number of bottles");
    return;
  }
  if(PhoneNumberr.length == 0){
   toast.error("Please, state the Phone number call");
   return;
 }
 if(PhoneNumberr.length > 10 || PhoneNumberr.length < 10){
  toast.error("Phone number must be 10 digits");
  return;
}
 if(Locationn == ""){
  toast.error("Please, let us know your location!");
  return;
}
 if(Telephonee == 0){
  toast.error("Please, state the phone number payment");
  return;
}
if(Telephonee.length > 10 || Telephonee.length < 10){
 toast.error("Payment phone number must be 10 digits");
 return;
}
 
  let token = localStorage.getItem("token");

   // Filter selected addons with count greater than 0
   const selectedAddonsToInclude = Object.entries(selectedAddons)
   .filter(([_, addon]) => addon.selected && addon.count > 0)
   .map(([addonId, addon]) => ({ addonId: addonId, Count: addon.count , price: addon.price}));

  axios({
    method : "POST",
    url : "https://sp-gas-api.onrender.com/api/v1/cart/addOrder",
    data : {
      productId : taId,
      quantity : Number(count),
      addOns : selectedAddonsToInclude,
      TotalAmount : totalPrice,
      Location : Locationn,
      Telephone : Telephonee,
      PhoneNumber : PhoneNumberr,
    },
    headers : {
      Authorization : `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((response)=>{
    console.log(response);
    setTimeout(() => {
      handlePaymentButtonClick();
      navigate("/Ordering");
    }, 1500);  
  })
  .catch((error)=>{
    toast.error("Order Not Sent Please Try Again");
    console.log(error);
  })
 };

// =========================================== End Checkout Process ================================================

  return (
    <div className={PaymentPageCSS.PaymentContent} id="PaymentPage">
      <div className={PaymentPageCSS.PaymentForms}>
        <h1 className={PaymentPageCSS.title}>Payment</h1>
         <div className={PaymentPageCSS.PaymentDetails}>
          <div className={PaymentPageCSS.GasOverView}>
           <img src={tarrifImagee} alt="image for the gas container not displaying" />
            <div className={PaymentPageCSS.GasDetails}>
             <h3>Product Details</h3>
              <ul>
                <li className={PaymentPageCSS.listOfDetails}>
                  <label htmlFor="size">Size: </label>
                  <h4> {kilogramm} kg</h4>  
                </li>
                <li className={PaymentPageCSS.listOfDetails}>
                  <label htmlFor="size">Type: </label>
                  <h4> {typee} </h4>
                </li>
                <li className={PaymentPageCSS.listOfDetails}>
                <label htmlFor="size"> Price: </label>
                  <h4> 
                  {`${(unitPrice.Price * kilogramm).toLocaleString()} Rwf`} 
                  </h4>
                </li>
                <li className={PaymentPageCSS.numberOfItems}>
                  <label htmlFor="NumberOfItem">Number Of Bottles:</label>
                  <input
                    type="number"
                    name="count"
                    value={count === "" ? "" : count}
                    onChange={handleCountChange}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className={PaymentPageCSS.AdditionalAddons}>
            <h3>Add-Ons</h3>
            {addonsLoading ? (<MoonLoader color="#08C25E" size="50" className={PaymentPageCSS.load} />) : (
            <ul className={PaymentPageCSS.AddonsList}>
              {addons?.map((adon) => {
                return (
                  <li key={adon?._id}>
                  <span className={PaymentPageCSS.span1}>
                    <h4>{adon?.Name}</h4>
                    <h4>
                    {`${adon?.Price.toLocaleString()} Rwf`} 
                    </h4>
                  </span>
                  <span className={PaymentPageCSS.span2}>
                    <input type="checkbox" 
                    onChange={(e) => handleCheckboxChange(adon?._id ,e.target.checked , adon?.Price)}
                    />
                    <input
                      type="number"
                      placeholder="count"
                      onChange={(e) => handleCountAddChange(adon?._id ,e.target.value , adon?.Price)}
                    />
                    {/* <h4> Total : {selectedAddons[adon?._id]?.total} Rwf</h4> */}
                  </span>
                </li>
                )
                })}
            </ul>
            )}
          </div>
        </div>
        <div className={PaymentPageCSS.ChoosePaymentMethodForm}>
          <div className={PaymentPageCSS.PaymentMethod}>
            <label
              className={PaymentPageCSS.PaymentMethodLabel}
              htmlFor="PaymentMethod"
            >
              Payment Method
            </label>
            <span className={PaymentPageCSS.choices}>
              <select className={PaymentPageCSS.choose} name="PaymentMethod">
                <option value="momoPay">MoMo Pay</option>
              </select>
              <select
                className={PaymentPageCSS.DeliveryChoice}
                name="DeliveryChoice"
                onChange={handleDeliveryChoiceChange}
                value={deliveryChoice}
              >
                <option value="Cash">Delivery</option>
                <option value="Self">PickUp</option>
              </select>
            </span>
          </div>
          <div className={PaymentPageCSS.TotalAmount}>
            <img src={Payment} alt="images for payment is not loading" /> 
            <div className={PaymentPageCSS.totalPayment}>
              <label htmlFor="totalPayment">Price :</label>
              <h4> 
              {`${Price.toLocaleString()} Rwf`} 
              </h4>
            </div>
            {deliveryChoice === "Cash" && (
               <div className={PaymentPageCSS.totalPayment}>
            <span className={PaymentPageCSS.displayDelivaryAmount}>
              <label htmlFor="totalPayment">Delivery Fee :</label>
              <h4>{`${deliveryFee.toLocaleString()} Rwf`} </h4>
            </span>
             </div>
          )}
            <div className={PaymentPageCSS.totalPayment}>
              <label htmlFor="totalPayment">Total Price :</label>
              <h4>{`${totalPrice.toLocaleString()} Rwf`}</h4>
            </div>
          </div>
        </div>
        <form action="#" className={PaymentPageCSS.PayForm}>
          <div className={PaymentPageCSS.PhoneAndLocations}>
            <div className={PaymentPageCSS.PhoneNumberToCall}>
              <label htmlFor="ContactNumber">Contact Number: </label>
              <input
                type="text"
                name="Contact"
                placeholder="add phone number to call"
                value={PhoneNumberr}
                onChange={handlePhoneNumberChange}
              />
            </div>
          
            <div className={PaymentPageCSS.CurrentLocation}>
              <label htmlFor="YourLocation">Current Location:</label>
              <input
                type="text"
                name="Locations"
                placeholder="add your current location"
                value={Locationn}
                onChange={handleLocationChange}
              />
            </div>
     
          </div>
          <div className={PaymentPageCSS.PhoneNumber}>
            <div className={PaymentPageCSS.Phone}>
              <label htmlFor="Phone">Phone Number For Payment</label>
              <input
                placeholder="07.. ... ..."
                type="text"
                name="phoneNumber"
                value={Telephonee}
                onChange={handleTelephoneChange}
              />
            </div>
            <button onClick={handleCheckout} className={PaymentPageCSS.paymentBTN}>PAY</button>
          </div>
          <ToastContainer/>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
