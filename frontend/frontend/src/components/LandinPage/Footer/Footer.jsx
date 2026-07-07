import footer from "./Footer.module.css";
import spLogo from "../../../assets/images/SP.png";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { FaArrowCircleUp } from "react-icons/fa";
import { Link as ScrollLink } from 'react-scroll';

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={footer.FooterContent}>
      <div className={footer.container}>
        <div className={footer.container1}>
          <div className={footer.logoText}>
            <img src={spLogo} className={footer.logo} />
            <h3 className={footer.title3}>gas</h3>
          </div>
          <div className={footer.navBarSections}>
            <div className={footer.footSections}>
              <h1>navigations</h1>
              <ul><li>
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
                  <a href="/">
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
                  >
                    About
                  </ScrollLink>
                ) : (
                  <a href="/">
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
                  >
                    Tariff
                  </ScrollLink>
                ) : (
                  <a href="/">
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
                  >
                    Locations
                  </ScrollLink>
                ) : (
                  <a href="/">
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
                  >
                    Contact Us
                  </ScrollLink>
                ) : (
                  <a href="/">
                    Contact Us
                  </a>
                )}
              </li>
              </ul>
            </div>
            <div className={footer.footSections}>
              <h1>Main Stations</h1>
              <ul>
                <li>SP-GAS Gasabo</li>
                <li>SP-GAS Nyarugenge</li>
                <li>SP-GAS Kicukiro</li>
              </ul>
            </div>
            <div className={footer.footContacts}>
              <h1>check our contacts</h1>
              <span className={footer.footSpan}>
                <FaPhone className={footer.footCons} />
                <p>+25079983456</p>
              </span>
              <span className={footer.footSpan}>
                <MdEmail className={footer.footCons} />
                <p>sprwanda@gamil.com</p>
              </span>
            </div>
            <div className={footer.footContacts}>
              <h1>follow our socials</h1>
              <span className={footer.footSpanSocial}>
                <FaInstagramSquare className={footer.footCons} />
                <p>instagram</p>
              </span>
              <span className={footer.footSpanSocial}>
                <FaSquareXTwitter className={footer.footCons} />
                <p>twitter</p>
              </span>
              <span className={footer.footSpanSocial}>
                <FaLinkedin className={footer.footCons} />
                <p>linkedin</p>
              </span>

              <FaArrowCircleUp
                onClick={handleScrollToTop}
                className={footer.scrollUpCon}
              />
            </div>
          </div>
        </div>

        <div className={footer.container2}>
          <div className={footer}>
            <span className={footer.copyright}>
              copyright <FaRegCopyright className={footer.copyCon} /> {new Date().getFullYear()} made
              by <a href="https://klab.rw/"><p>k-lab rw</p></a>.
            </span>
          </div>
          <div className={footer.container2Privacy}>
            <p>privacy Policy</p>
            <p className={footer.par3}>term of use</p>
            <p>cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
