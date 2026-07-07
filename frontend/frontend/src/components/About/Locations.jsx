import LocationsCSS from '../About/Locations.module.css'

function Locations() {
  return (
    <div className={LocationsCSS.LocationsContent} id='Locations'>
        <div className={LocationsCSS.mapsContainer}>
            <h1 className={LocationsCSS.Title}>Locations</h1>
            <div className={LocationsCSS.map}>
                <iframe className={LocationsCSS.mapIframe} src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d30607.79514638295!2d30.066595630129367!3d-1.9550632439832505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssp rwanda!5e0!3m2!1sen!2srw!4v1663256798141!5m2!1sen!2srw" allowfullscreen="" loading="lazy" />
            </div>
        </div>
        <div className={LocationsCSS.LocationsContainer}>
          <div className={LocationsCSS.LocationsRows}>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Gitega</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Gatsata</h2>
              <h4>KG 19 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Kimihurura</h2>
              <h4>KG 3 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Kacyiru</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Kimisagara</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Kicukiro</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Nyamirambo</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Kimironko</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Bugesera</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
            <div className={LocationsCSS.Locationscolumn}>
              <h2>SP GAS Ruyenzi</h2>
              <h4>KG 9 Ave, Kigali</h4>
              <h6>24X3+HC6</h6>
              <a href="#">Get Directions</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Locations
