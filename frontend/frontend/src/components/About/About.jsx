import AboutCSS from "../About/About.module.css"
import { MdGasMeter } from "react-icons/md";
import { FiTool } from "react-icons/fi";
import { FaTools } from "react-icons/fa";

function About() {
  return (
    <div className={AboutCSS.AboutContent} id="About">
      <div className={AboutCSS.header}>
        <h1>
          About Us <br />
          <small>ABOUT OUR SERVICES, SP Ltd is the most reliable cooking GAS supplier in Rwanda.</small> </h1>
      </div>
      <div className={AboutCSS.aboutCardContainer}>
        <div className={AboutCSS.card}>
          <div className={AboutCSS.cardHeader}>
            <MdGasMeter className={AboutCSS.cardIcon}/>
            <h2>Selling Cooking Gas</h2>
          </div>
          <p className={AboutCSS.descriptions}>
          Discover convenience and 
          reliability with our premium cooking
           gas delivery service. Get ready to elevate 
           your culinary experience effortlessly
          </p>
        </div>
        <div className={AboutCSS.card}>
        <div className={AboutCSS.cardHeader}>
            <FiTool className={AboutCSS.cardIcon}/>
            <h2>Repair different parts</h2>
          </div>
          <p className={AboutCSS.descriptions}>
          Experience peace of mind with our comprehensive repair services,
           ensuring every part of your cooking gas system 
           functions flawlessly. Trust us to keep your kitchen running smoothly.
          </p>
        </div>
        <div className={AboutCSS.card}>
          <div className={AboutCSS.cardHeader}>
            <FaTools className={AboutCSS.cardIcon}/>
            <h2>Home installations</h2>
          </div>
          <p className={AboutCSS.descriptions}>
          Transform your home with professional gas installations tailored to your needs. Let us enhance your kitchen's efficiency and safety for a seamless cooking experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
