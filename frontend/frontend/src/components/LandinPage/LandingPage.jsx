import edit from './LandingPage.module.css'
import About from '../About/About'
import Contact from '../About/Contact'
import Locations from '../About/Locations'
import TablePrice from '../LandinPage/Section2/Table/TablePrice.jsx'
import Description from '../../components/LandinPage/Section1/Description/Description.jsx'

function LandingPage() {

  return (
    <>
      <div className={edit.padding}>
        <Description/>
        <About/>
        <TablePrice/>
        <Locations/>
        <Contact/>
      </div>
    </>
  )
}

export default LandingPage
