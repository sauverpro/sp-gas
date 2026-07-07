import LoginCSS from './Login.module.css'
import loginImage from '../images/LoginImage.png'
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';


function Login() {

// ================== Login Integration =============================================

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passworrd, setPassworrd] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setphoneNumberError] = useState("");
  const [validateComplete, isValidateComplete] =useState(false);
  const [showPassword, setShowPassword] = useState("password");

////////////////////////////// Sign in authentications ///////////////////////////

  const handleSignin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios({
      method: "POST",
      url: "https://sp-gas-api.onrender.com/api/v1/users/login",
      data: {
        PhoneNumber: phoneNumber,
        Password: passworrd,
      },
    })
      .then((response) => {
        console.log(response);
        //user
        localStorage.setItem("data", JSON.stringify(response.data.data));
        // token
        localStorage.setItem("token", response.data.access_token);
        const token = localStorage.getItem("token");
        console.log(token);

        toast.success("Logged in sucesfully");
        setIsLoading(false);
        setTimeout(() => {
          if (response.data.data.Role === "Admin")  {
            navigate("/dashboard/stats");
          } else if (response.data.data.Role === "Manager") {
            navigate("/dashboard/stationmanagerdashboard");     
          }        
          else {
            navigate("/");
          }
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        toast.error("User Not Found");
      });
  };

// ================== End Login Integration =============================================


// ================== Login Validation ============================================= 

    const phonePattern =/(0(7[2|3|8|9][0-9]))\d{6}/

    const Validator = (e) => {
      e.preventDefault();
      if (phoneNumber.length === 0) {
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
      } else if (passworrd.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        setIsLoading(false);
        console.log(passwordError);
      } else if (passworrd.indexOf(" ") >= 0) {
        setPasswordError("Password can't contain space");
        setIsLoading(false);
        console.log(passwordError);
      } else {
        setphoneNumberError("");
        setPasswordError("");
        setIsLoading(true);
        isValidateComplete(true)
        handleSignin(e)
      }
    };

// ================== EndLogin Validation =============================================

// ============== Showing & Hiding Password ================================================

    const handleShow = (e)=>{
        e.preventDefault()
        if(showPassword == "password"){
          setShowPassword("text")
        }else{
          setShowPassword("password")
        }
    }

// ============== Showing & Hiding Password ================================================

  return (
    <div className={LoginCSS.container_of_all}>
      <div className={LoginCSS.bottombackground}></div>
      <div className={LoginCSS.login_contents}>
        <div className={LoginCSS.loginForm_Container}>
          <form className={LoginCSS.LoginForm}>
            <div className={LoginCSS.loginTitle}>
              <h1>Login</h1>
              <p>
                Doesn`t have an account yet ?{"           "}
                <Link to="/Regist" className={LoginCSS.linkToSignUp}>
                  Sign Up
                </Link>
              </p>
            </div>
            <div className={LoginCSS.LoginEmail}>
              <label htmlFor="LoginEmailLbel">Phone Number</label>
              <input
                placeholder="07........."
                type="text"
                className={LoginCSS.emailAddress1}
                onChange={(e) => {
                  e.preventDefault();
                  setPhoneNumber(e.target.value);
                }}

              />
              <p style={{fontSize:10, color:"red"}}>{phoneNumberError}</p>
            </div>
            <div className={LoginCSS.LoginPassword}>
              <div>
                <label htmlFor="password">Password</label>
                <a href="#">Forget Password?</a>
              </div>
              <div className={LoginCSS.LoginPasswordd}>
              <input
                placeholder="Enter Your Password"
                type={showPassword}
                name="password"
                className={LoginCSS.LoginPassword1}
                onChange={(e) => {
                  e.preventDefault();
                  setPassworrd(e.target.value);
                }}
              />
              <FaEyeSlash className={LoginCSS.LoginPasswordCon} onClick={handleShow}/>
              </div>
              <p style={{fontSize:10, color:"red"}}>{passwordError}</p>
            </div>
            {/* <div className={LoginCSS.remember_me}>
              <input 
              type="checkbox"
              id={LoginCSS.rememberMe}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div> */}
            <button  onClick={(e) =>  Validator(e)}  type="submit" className={LoginCSS.LoginBtn}>  
            {isLoading ? (
           <PulseLoader
           className={LoginCSS.loader}
           color = "#08C25E"
           margin={2}
           size={15}
           speedMultiplier={1}
         />    
          ) : (
            "LOGIN"
          )}
              </button>
              <ToastContainer />
            <div className={LoginCSS.AnotherOption}>
              <hr width="35%" size="2" />
              <h4>or login with</h4>
              <hr width="35%" size="2" />
            </div>
            <div className={LoginCSS.googleAndFb}>
              <button className={LoginCSS.google}>
                <FcGoogle className={LoginCSS.googleIcon} />
                <h4>Google</h4>
              </button>
              <button className={LoginCSS.Fb}>
                <ImFacebook className={LoginCSS.facebookicon} />
                <h4>Facebook</h4>
              </button>
            </div>
          </form>
        </div>
        <div className={LoginCSS.loginImage_Container}>
          <img
            src={loginImage}
            alt="vector image for login page"
            className={LoginCSS.LoginImage}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
