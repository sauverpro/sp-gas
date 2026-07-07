import RegistCSS from './Regist.module.css'
import RegistImage from '../images/LoginImage.png'
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

function Resist() {

// sign up authentication

const [isLoading, setIsLoading] = useState(false);
// let token = localStorage.getItem("token");

const navigate = useNavigate();
const [fullNames, setFullNames] = useState("");
const [email, setEmail] = useState("");
const [phoneNumber , setPhoneNumber] = useState("");
const [password, setPassword] = useState("");
const [fullNamesError, setfullNamesError] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [phoneNumberError, setphoneNumberError] = useState("");
const [validateComplete, isValidateComplete] =useState(false);
const [showPassword, setShowPassword] = useState("password");

const handleSignup = (e) => {
  e.preventDefault();
  setIsLoading(true);
  axios({
    method: "POST",
    url: "https://sp-gas-api.onrender.com/api/v1/users/register",
    data: {
      Email: email,
      PhoneNumber: phoneNumber,
      FullNames: fullNames,
      Password: password,
    },
  })
    .then((Response) => {
      // localStorage.setItem("token", Response.data.access_token);
      // localStorage.setItem("data", JSON.stringify(Response.data.data));
      toast.success(Response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      console.log(Response);
    })
    .catch((error) => {
      setIsLoading(false);
      toast.error(error.message);
    });
};
const phonePattern =/(0(7[2|3|8|9][0-9]))\d{6}/
const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const Validator = (e) => {
  e.preventDefault();
  if (fullNames.length == "") {
    setfullNamesError("name is required");
    setIsLoading(false);
    console.log(fullNamesError);
  }
  else if (email == "") {
    setEmailError("email is required");
    setIsLoading(false);
    console.log(emailError);
  }
  else if (!isValidEmail.test(email)){
    setEmailError("invalid email");
    toast.error("Please, write email in its format");
    setIsLoading(false);
    console.log(emailError);
    return;
  }
  else if (phoneNumber.length === 0) {
    setphoneNumberError("phone number is required");
    setIsLoading(false);
    console.log(phoneNumberError);
  } else if (!phonePattern.test(phoneNumber)) {
    setphoneNumberError("Invalid phoneNumber");
    setIsLoading(false);
    console.log(phoneNumberError);
  } else if (phoneNumber.indexOf(" ") >= 0) {
    setphoneNumberError("phone number can't contain space");
    setIsLoading(false);
    console.log(phoneNumberError);
  } else if (phoneNumber.length > 10){
      setphoneNumberError("phone number must be of 10 digits");
      setIsLoading(false);
      console.log(phoneNumberError);
  } else if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    setIsLoading(false);
    console.log(passwordError);
  } else if (password.indexOf(" ") >= 0) {
    setPasswordError("Password can't contain space");
    setIsLoading(false);
    console.log(passwordError);
  } else {
    setphoneNumberError("");
    setPasswordError("");
    setIsLoading(true);
    isValidateComplete(true)
    handleSignup(e)
  }
};

const validateLogin = (e)=>{
     
  e.preventDefault();
  if(validateComplete){
    handleSignup(e)
  }
  
}

const handleShow = (e)=>{
    e.preventDefault()
    if(showPassword == "password"){
      setShowPassword("text")
    }else{
      setShowPassword("password")
    }
}

  return (
    <div className={RegistCSS.signUp_Content}>
      <div className={RegistCSS.bottombackground}></div>
      <div className={RegistCSS.signUp_main_contents}>
        <div className={RegistCSS.signUpForm_Container}>
          <form className={RegistCSS.signUpForm}>
            <div className={RegistCSS.SignUpTitle}>
              <h1>SignUp</h1>
              <p>
              Already have an account?{" "}
                <Link to="/login" className={RegistCSS.linkTologin}>
                  Sign In
                </Link>
              </p>
            </div>
            <div className={RegistCSS.SignUpDatas_container}>
            <input
                placeholder="Name or User Name"
                type="text"
                id={RegistCSS.SignUpName}

                onChange={(e) => {
                  e.preventDefault();
                  setFullNames(e.target.value);
                }}

              />
              <p style={{fontSize:10, color:"red"}}>{fullNamesError}</p>

              <input
                placeholder="Email Address"
                type="email"
                className={RegistCSS.SignUpemailAddress}
                required
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}

              />
              <p style={{fontSize:10, color:"red"}}>{emailError}</p>

              <input
                placeholder="07..."
                type="text"
                className={RegistCSS.SignUpemailAddress}

                onChange={(e) => {
                  e.preventDefault();
                  setPhoneNumber(e.target.value);
                }}
              />
              <p style={{fontSize:10, color:"red"}}>{phoneNumberError}</p>

              <input
                placeholder="Type Password"
                type="password"
                id={RegistCSS.signUpPassword}
                
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}

              />
              <p style={{fontSize:10, color:"red"}}>{passwordError}</p>


            </div>
            <button onClick={(e) =>  Validator(e)} type="submit" className={RegistCSS.SignUpBtn}>
            {isLoading ?  
           <PulseLoader
           className={RegistCSS.loader}
           color = "#08C25E"
           margin={2}
           size={15}
           speedMultiplier={1}
         /> 
            : (
            "SIGN UP"
          )}
            </button>
            <ToastContainer />
            <div className={RegistCSS.AnotherSignUpOptions}>
              <hr width="32%" size="2" />
              <h4>or Signup with</h4>
              <hr width="32%" size="2" />
            </div>
            <div className={RegistCSS.googleAndFb}>
              <button className={RegistCSS.google}>
                <FcGoogle className={RegistCSS.googleIcon} />
                <h4>Google</h4>
              </button>
              <button className={RegistCSS.Fb}>
                <ImFacebook className={RegistCSS.facebookicon} />
                <h4>Facebook</h4>
              </button>
            </div>
          </form>
        </div>
        <div className={RegistCSS.SignUpImage_Container}>
          <img
            src={RegistImage}
            alt="vector image for login page"
            className={RegistCSS.SignUpImage}
          />
        </div>
      </div>
      <div className={RegistCSS.bottombackground}></div>
    </div>
  )
}

export default Resist