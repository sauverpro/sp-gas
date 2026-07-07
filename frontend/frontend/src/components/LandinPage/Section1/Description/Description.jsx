import descript from "./Description.module.css";
import apple from "../../../../assets/images/app-store.png";
import google from "../../../../assets/images/google-store.png";
import lifter from "../../../../assets/images/image 2.png";

function Description() {
  return (
    <div className={descript.homeContent} id="Description">
      <div className={descript.container}>
        <div className={descript.container1}>
          <h1 className={descript.h1}>
            SP Gas Rwanda, get Cooking Gas without leaving  your
            Home.
          </h1>
            <p className={descript.ibisobanuro}>
              SP Gas Rwanda Limited after many years of collaboration with you
              in vehicles fuels, now it has brought you the easiest way to get
              Cooking gas from your nearest SP gas station all the way to your
              door-step. From now, you can order Cooking gas wherever you are
              and whenever you say so.
            </p>
          <div className={descript.descrButtons}>
            <button className={descript.button}>
              <img src={apple} />
            </button>
            <button className={descript.button}>
              <img src={google} />
            </button>
          </div>
        </div>
        <div className={descript.container2}>
          <img src={lifter} className={descript.appPhoto} />
        </div>
      </div>
    </div>
  );
}

export default Description;
