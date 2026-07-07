import contactCSS from './Contact.module.css'
import { MdLocationOn } from "react-icons/md";


function Contact() {
  return (
    <div className={contactCSS.ContactContent} id='Contact' >
        <div className={contactCSS.MapContainer}>
            <div className={contactCSS.Title}>
                <MdLocationOn className={contactCSS.locationIcon} />
                <h1>Find Us Now</h1>
            </div>
            <div className={contactCSS.Map}>
                <iframe className={contactCSS.mapIfram} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63800.11636049512!2d29.989006521679702!3d-1.9502329999999986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca426017fc52b%3A0x1f9e871f099927f6!2sSP%20Rwanda%20HQ!5e0!3m2!1sen!2srw!4v1700817178194!5m2!1sen!2srw" allowfullscreen="" loading="lazy"  />
            </div>
        </div>
        <div className={contactCSS.ContactFormContainer}>
            <h1 className={contactCSS.ContactTitle}>
                Got More Questions? <br />
                <strong>Send Us a Message</strong>
            </h1>
            <div className={contactCSS.ContactForm}>
                <form action="#" className={contactCSS.form} >
                    <div className={contactCSS.FullName}>
                        <label htmlFor="Names">Full Names</label>
                        <input placeholder='enter your names' type="text" name="names" />
                    </div>
                    <div className={contactCSS.FullName}>
                        <label htmlFor="email">Email</label>
                        <input placeholder='example@gmail.com' type="email" name="email" />
                    </div>
                    <div className={contactCSS.FullName}>
                        <label htmlFor="Message">Message</label>
                        <textarea placeholder='write message here!' name="message" cols="30" rows="10"></textarea>
                    </div>
                </form>
            </div>
            <button className={contactCSS.contactButton}>Send Message</button>
        </div>
    </div>
  )
}

export default Contact
