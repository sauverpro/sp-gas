import { Link as ScrollLink } from 'react-scroll';
import "./NavBar.css";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import spLogo from "../../../../assets/images/SP.png";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";
import kg6 from '../../../../../src/assets/images/6kg.png';
import kg12 from '../../../../../src/assets/images/12kg.png';
import kg20 from '../../../../../src/assets/images/20kg.png';
import { TbTruckDelivery } from "react-icons/tb";
import { PiCircleDashedFill } from "react-icons/pi";
import { FaHandshakeSimple } from "react-icons/fa6";
import OrderModal from '../../../../../src/components/ViewOrdersModal/ViewOrdersModal.module.css'
import userAvatar from "../../../images/UserAvatar.avif"
import { RiAccountCircleFill } from "react-icons/ri";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { IoPersonAddSharp, IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  //to open and close form
  const [modal, setModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [userProfileModal, setUserProfileModal] = useState(false);

  const handleUserProfileModalOpen = () => {
    setUserProfileModal(true);
  }

  const handleUserProfileModalClose = () => {
    setUserProfileModal(false);
  }

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleAllLinksClick = () => {
    handleClick();
    handleClose();
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  /****View Order Modal****/
  const [isOpen, SetIsOpen] = useState(false);
  const openModal = () => {
    SetIsOpen(true);
  };
  const closedModal = () => {
    SetIsOpen(false);
  };
  
  /****View Order Modal****/
  const user = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setUserFullName(`${user.fullName}`);
    } else {
      setIsLoggedIn(false);
      setUserFullName("");
    }
  }, [user]);

  const toggleLogoutButton = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserFullName("");
    setShowLogoutButton(false);
    navigate("/login");
  };




  return (
    <div className="NavBarContent">
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={spLogo} alt="logo" />
          <h1>GAS</h1>
        </a>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes
              size={30}
              onClick={handleClose}
              style={{ color: "#ffffff" }}
            />
          ) : (
            <FaBars
              size={30}
              onClick={handleOpen}
              style={{ color: "#ffffff" }}
            />
          )}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            {window.location.pathname === "/" ? (
              <ScrollLink
                to="Description"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                Home
              </ScrollLink>
            ) : (
              <a href="/">Home</a>
            )}
          </li>
          <li className="nav-item">
            {window.location.pathname === "/" ? (
              <ScrollLink
                to="About"
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
              >
                About
              </ScrollLink>
            ) : (
              <a href="/">About</a>
            )}
          </li>
          <li className="nav-item">
            {window.location.pathname === "/" ? (
              <ScrollLink
                to="TablePrice"
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
              >
                Tariff
              </ScrollLink>
            ) : (
              <a href="/">Tariff</a>
            )}
          </li>
          <li className="nav-item">
            {window.location.pathname === "/" ? (
              <ScrollLink
                to="Locations"
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
              >
                Locations
              </ScrollLink>
            ) : (
              <a href="/">Locations</a>
            )}
          </li>
          <li className="nav-item">
            {window.location.pathname === "/" ? (
              <ScrollLink
                to="Contact"
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
              >
                Contact Us
              </ScrollLink>
            ) : (
              <a href="/">Contact Us</a>
            )}
          </li>
        </ul>
        <div className={OrderModal.modalContainer}>
            <TiShoppingCart className={OrderModal.viewBuCon} onClick={openModal}/>
          {isOpen && 
          <div className={OrderModal.modContainer}>
            <div className={OrderModal.closeButContaine}>
              <IoIosCloseCircle className={OrderModal.viewBuCloseCon} onClick={closedModal}/>
            </div>
            <h1 className={OrderModal.orderTitle}>Orders</h1>
            
            <div className={OrderModal.srcollContainer}>
            <div className={OrderModal.orderDetailCard}>
                <img src={kg6} className={OrderModal.productImage}/>
              <ul>
                <li>product: waiting...</li>
                <li>quantity: waiting...</li>
                <li>price: waiting...</li>
                <li>date: waiting...</li>
              </ul>
              <span>
                <span className={OrderModal.statuscolor1}> 
                  <PiCircleDashedFill />
                  <h6>Processing</h6>
                </span>
              </span>
            </div>
            <div className={OrderModal.orderDetailCard}>
                <img src={kg12} className={OrderModal.productImage}/>
              <ul>
                <li>product: waiting...</li>
                <li>quantity: waiting...</li>
                <li>price: waiting...</li>
                <li>date: waiting...</li>
              </ul>
              <span>
                <span className={OrderModal.statuscolor}>
                  <TbTruckDelivery />
                  <h6>Deliverying</h6>
                </span>
              </span>
            </div>
            <div className={OrderModal.orderDetailCard}>
                <img src={kg20} className={OrderModal.productImage}/>
              <ul>
                <li>product: waiting...</li>
                <li>quantity: waiting...</li>
                <li>price: waiting...</li>
                <li>date: waiting...</li>
              </ul>
              <span>
                <span className={OrderModal.status}>
                  <FaHandshakeSimple />
                  <h6>Received</h6>
                </span>
              </span>
            </div>
          </div>
          </div>
          }
        </div>   
        {isLoggedIn ? (
          <div className="profile">
            <div className="profile_container">
              <img onClick={toggleLogoutButton} className="avatarImage" src={userAvatar} alt={userFullName} />
              <span onClick={toggleLogoutButton} className="usernames">{userFullName}</span>
            </div>
            {showLogoutButton && (
              <div className="editProfile">
                <ul className='editList'> 
                  <li className="PersonalProfiles">
                    <RiAccountCircleFill className='profileIcons'/>
                    <button onClick={handleUserProfileModalOpen} className="logoutButton">My Account</button>
                  </li>
                  <li className='list11'>
                    <a href="login">
                      <IoPersonAddSharp className='icons'/>
                      <button className="logoutButton">Add Another Account</button>
                    </a>
                  </li>
                  <li className='list1'>
                    <MdOutlineSettingsSuggest className='icons'/>
                    <button className="logoutButton">Setting</button>
                  </li>
                  <li className='list1'>
                      <IoLogOutOutline className='icons'/>
                      <button onClick={handleLogout} className="logoutButton">Logout</button>
                  </li>
                </ul>
              </div>   
              )}
          </div>
        ) : (
            <Link to="/Login">
              <button className="loginButton">login</button>
            </Link>
        )}
      </nav>
      {modal && (
        <div className="navBarModel">
          <nav className="ModalNavBarContent">
            <ul className="ModalLinkList">
              <li>
                {window.location.pathname === "/" ? (
                  <ScrollLink
                    to="Description"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={handleAllLinksClick}
                  >
                    Home
                  </ScrollLink>
                ) : (
                  <a onClick={handleAllLinksClick} href="/">
                    Home
                  </a>
                )}
              </li>
              <li>
                {window.location.pathname === "/" ? (
                  <ScrollLink
                    to="About"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={handleAllLinksClick}
                  >
                    About
                  </ScrollLink>
                ) : (
                  <a onClick={handleAllLinksClick} href="/">
                    About
                  </a>
                )}
              </li>
              <li>
                {window.location.pathname === "/" ? (
                  <ScrollLink
                    to="TablePrice"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={handleAllLinksClick}
                  >
                    Tariff
                  </ScrollLink>
                ) : (
                  <a onClick={handleAllLinksClick} href="/">
                    Tariff
                  </a>
                )}
              </li>
              <li>
                {window.location.pathname === "/" ? (
                  <ScrollLink
                    to="Locations"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={handleAllLinksClick}
                  >
                    Locations
                  </ScrollLink>
                ) : (
                  <a onClick={handleAllLinksClick} href="/">
                    Locations
                  </a>
                )}
              </li>
              <li>
                {window.location.pathname === "/" ? (
                  <ScrollLink
                    to="Contact"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={handleAllLinksClick}
                  >
                    Contact Us
                  </ScrollLink>
                ) : (
                  <a onClick={handleAllLinksClick} href="/">
                    Contact Us
                  </a>
                )}
              </li>
            </ul>
            <a href="/" className="modalLogo">
              <img className="logoImage" src={spLogo} alt="logo" />
            </a>
          </nav>
        </div>
      )}
      {userProfileModal && (
        <div className="EditProfile_Container">
          <div onClick={handleUserProfileModalClose} className="overlay"></div>
          <div className="EditProfileForm">
            <form className='profileForm'>
              <div className="profileImage">
                <div className='tooltip'>
                  <img className='imageforProfile' src={userAvatar} alt={userFullName} />
                  <span className="tooltiptext">Edit profile...</span>
                </div>
                <h3>{userFullName}</h3>
                <h6>{user.Email}</h6>
              </div>
              <div className="changeProfileName">
                <span className='edit'>
                  <label htmlFor="editnames">Edit Your Names</label>
                  <input value={userFullName} type="text" className='editNames' />
                </span>
                <span className='edit'>
                  <label htmlFor="editnames">Edit Your email</label>
                  <input value={user.Email} type="text" className='editemail' />
                </span>
                
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
