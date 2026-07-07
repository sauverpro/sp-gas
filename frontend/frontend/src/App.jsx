import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

/****Layouts*****/
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout.jsx";
/****End Layouts*****/

/*****  ******  ******  Pages  ****** ****** ******/
import Dashboard1 from "./screens/dashboards/Dashboard1";
import AdminStock from './screens/dashboards/dashboard1-components/AdminStock.jsx';
import AdminAddStock from './screens/dashboards/dashboard1-components/AdminAddStock.jsx';
import AdminStations from './screens/dashboards/dashboard1-components/AdminStations.jsx';
import AdminAddStations from "./screens/dashboards/dashboard1-components/AdminAddStations.jsx";
import AdminStationDetails from './screens/dashboards/dashboard1-components/AdminStationDetails.jsx';
import AdminEditStation from './screens/dashboards/dashboard1-components/AdminEditStation.jsx';
import AdminUserOrders from './screens/dashboards/dashboard1-components/AdminUserOrders.jsx';
import AdminUserOrderDetails from './screens/dashboards/dashboard1-components/AdminUserOrderDetails.jsx';
import AdminExternalOrders from './screens/dashboards/dashboard1-components/AdminExternalOrders.jsx';
import AdminExternalOrdersDetails from './screens/dashboards/dashboard1-components/AdminExternalOrdersDetails.jsx';
import AdminManagers from './screens/dashboards/dashboard1-components/AdminManagers.jsx';
import AdminManagerDetails from "./screens/dashboards/dashboard1-components/AdminManagerDetails.jsx";
import AdminEditManager from "./screens/dashboards/dashboard1-components/AdminEditManager.jsx";
import AdminAddManager from "./screens/dashboards/dashboard1-components/AdminAddManager.jsx";
import AdminStockDetails from './screens/dashboards/dashboard1-components/AdminStockDetails.jsx';
import AdminEditStock from './screens/dashboards/dashboard1-components/AdminEditStock.jsx';
import AdminAddOns from './screens/dashboards/dashboard1-components/AdminAddOns.jsx';
import AdminAddAddOns from './screens/dashboards/dashboard1-components/AdminAddAddOns.jsx';
import AdminAddOnsDetails from './screens/dashboards/dashboard1-components/AdminAddOnsDetails.jsx';
import AdminEditAddOns from './screens/dashboards/dashboard1-components/AdminEditAddOns.jsx';

/*****Tables******/
import BasicTable from "./screens/tables/BasicTable";

// form elements
import ExAutoComplete from "./screens/FormElements/ExAutoComplete";
import ExButton from "./screens/FormElements/ExButton";
import ExCheckbox from "./screens/FormElements/ExCheckbox";
import ExRadio from "./screens/FormElements/ExRadio";
import ExSlider from "./screens/FormElements/ExSlider";
import ExSwitch from "./screens/FormElements/ExSwitch";

// form layouts
import FormLayouts from "./screens/FormLayouts/FormLayouts";
import { ThemeProvider } from "@material-ui/core";
import { StyledEngineProvider } from '@material-ui/core';
import { baseTheme } from './assets/global/Theme-variable'
import LandingPage from './components/LandinPage/LandingPage.jsx';
import AdminStationOrders from './screens/dashboards/dashboard1-components/AdminStationOrders.jsx';
import AdminStationOrderDetail from './screens/dashboards/dashboard1-components/AdminStationOrderDetail.jsx';
import NavBar from './components/LandinPage/Section1/NavBar/NavBar.jsx'
import Footer from './components/LandinPage/Footer/Footer.jsx';
import Login from './components/loginPage/Login.jsx';
import viewOrderModal from './components/ViewOrdersModal/ViewOrdersModal.jsx'
import Regist from './components/loginPage/Regist.jsx'
import Ordering from './components/LandinPage/Section2/Ordering.jsx';
import AdminTariff from './screens/dashboards/dashboard1-components/AdminTariff.jsx';
import AdminViewTariff from './screens/dashboards/dashboard1-components/AdminViewTariff.jsx';
import AdminEditTariff from './screens/dashboards/dashboard1-components/AdminEditTariff.jsx';
import AdminAddTariff from './screens/dashboards/dashboard1-components/AdminAddTariff.jsx';
import PaymentPage from './components/LandinPage/Section2/Table/PaymentPage.jsx';

//Station Manager layouts
import StationManagerdashboard from './screens/dashboards/stationManagerdashboard2-components/StationManagerDashboard.jsx';
import StationManagerAssignedOrder from './screens/dashboards/stationManagerdashboard2-components/StationManagerAssignedOrder.jsx';
import StationManagerExternalOrder from './screens/dashboards/stationManagerdashboard2-components/StationManagerExternalOrder.jsx';
import StationManagerStock from './screens/dashboards/stationManagerdashboard2-components/StationManagerStock.jsx';
import StationmanagerRequestStock from './screens/dashboards/stationManagerdashboard2-components/StationManagerRequestStock.jsx';
import StationManagerRequestedStock from './screens/dashboards/stationManagerdashboard2-components/StationManagerRequestedStock.jsx';
import StationManagerViewAssingedOrder from './screens/dashboards/stationManagerdashboard2-components/StationManagerViewAssingedOrder.jsx'
import StationManagerExternalOrderDetail from './screens/dashboards/stationManagerdashboard2-components/StationManagerExternalOrderDetail.jsx';
import StationManagerAddExternalOrder from './screens/dashboards/stationManagerdashboard2-components/StationManagerAddExternalOrder.jsx';
import ViewOrdersModal from './components/ViewOrdersModal/ViewOrdersModal.jsx';
import Driver from './screens/dashboards/dashboard1-components/Driver.jsx';
import AddDriver from './screens/dashboards/dashboard1-components/AddDriver.jsx';
import DriverDetail from './screens/dashboards/dashboard1-components/DriverDetail.jsx';
import EditDriver from './screens/dashboards/dashboard1-components/EditDriver.jsx';

function App() {
  const LandingPageLayout = () => {
    return (
      <>
        <NavBar/>
        <Outlet />
        <Footer/>
      </>
    );
  };

  return (
    <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={baseTheme}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<LandingPageLayout />}>
              <Route index element={<LandingPage/>} />
              <Route path='/Login' element={<Login/>} />
              <Route path='/Regist' element={<Regist/>} />
              <Route path='/Ordering' element={<Ordering/>} />
              <Route path='/PaymentPage/:id' element={<PaymentPage/>} />
              <Route path='/viewOrders' element={<ViewOrdersModal/>}/>
            </Route>
            
            <Route path='/dashboard' element={<DashboardLayout />} >
              <Route path='/dashboard/stats' element={<Dashboard1 />} />
              <Route path='tables/basic-table' element={<BasicTable />} />
              <Route path='form-layouts/form-layouts' element={<FormLayouts />} />
              <Route path='form-elements/autocomplete' element={<ExAutoComplete />} />
              <Route path='form-elements/button' element={<ExButton />} />
              <Route path='form-elements/checkbox' element={<ExCheckbox />} />
              <Route path='form-elements/radio' element={<ExRadio />} />
              <Route path='form-elements/slider' element={<ExSlider />} />
              <Route path='form-elements/switch' element={<ExSwitch />} />
              <Route path='/dashboard/adminstock' element={<AdminStock/>} />
              <Route path='/dashboard/admineditstock' element={<AdminEditStock/>}/>
              <Route path='/dashboard/adminstockdetails/:id' element={<AdminStockDetails/>} />
              <Route path='/dashboard/adminaddstock' element={<AdminAddStock/>} />
              <Route path='/dashboard/adminstations' element={<AdminStations/>} />
              <Route path='/dashboard/adminaddstations' element={<AdminAddStations/>}/>
              <Route path='/dashboard/adminstationdetails/:id' element={<AdminStationDetails/>}/>
              <Route path='/dashboard/admineditstation' element={<AdminEditStation/>}/>
              <Route path='/dashboard/adminstationorders' element={<AdminStationOrders/>}/>
              <Route path='/dashboard/adminstationordersdetail/:id' element={<AdminStationOrderDetail/>}/>
              <Route path='/dashboard/adminuserorders' element={<AdminUserOrders/>}/>
              <Route path='/dashboard/adminuserorderdetails/:id' element={<AdminUserOrderDetails/>}/>
              <Route path='/dashboard/adminexternalorders' element={<AdminExternalOrders/>}/>
              <Route path='/dashboard/adminexternalorderdetails/:id' element={<AdminExternalOrdersDetails/>}/>
              <Route path='/dashboard/admintariff' element={<AdminTariff/>}/>
              <Route path='/dashboard/admintariffdetail/:id' element={<AdminViewTariff/>}/>
              {/* <Route path='/dashboard/adminedittariff/:id' element={<AdminEditTariff/>}/> */}
              <Route path='/dashboard/adminedittarif/:id' element={<AdminEditTariff/>}/>
              <Route path='/dashboard/adminaddtariff' element={<AdminAddTariff/>}/>
              <Route path='/dashboard/adminmanagers' element={<AdminManagers/>}/>
              <Route path='/dashboard/adminmanagerdetails/:id' element={<AdminManagerDetails/>}/>
              <Route path='/dashboard/admineditmanager' element={<AdminEditManager/>}/>
              <Route path='/dashboard/adminaddmanager' element={<AdminAddManager/>}/>
              <Route path='/dashboard/adminaddons' element={<AdminAddOns/>}/>
              <Route path='/dashboard/adminaddaddons' element={<AdminAddAddOns/>}/>
              <Route path='/dashboard/adminaddonsdetails/:id' element={<AdminAddOnsDetails/>}/>
              <Route path='/dashboard/admineditaddons'element={<AdminEditAddOns/>}/>
              <Route path='/dashboard/drivers' element={<Driver/>}/>
              <Route path='/dashboard/addDriver' element={<AddDriver/>}/>
              <Route path='/dashboard/driverdetail/:id' element={<DriverDetail/>}/>
              <Route path='/dashboard/editDriver' element={<EditDriver/>}/>
              <Route path='/dashboard/stationmanagerdashboard' element={<StationManagerdashboard/>}/>
              <Route path='/dashboard/stationmanagerassignedorder' element={<StationManagerAssignedOrder/>}/>
              <Route path='/dashboard/stationmanagerexternalorder' element={<StationManagerExternalOrder/>}/>
              <Route path='/dashboard/stationmanagerStock' element={<StationManagerStock/>}/>
              <Route path='/dashboard/stationmanagerrequestedStock' element={<StationManagerRequestedStock/>}/>
              <Route path='/dashboard/stationmanagerrequestStock' element={<StationmanagerRequestStock/>}/>
              <Route path='/dashboard/stationmanagerViewassignedorder/:id' element={<StationManagerViewAssingedOrder/>}/>
              <Route path='/dashboard/stationmanagerexternalorderdetail/:id' element={<StationManagerExternalOrderDetail/>}/>
              <Route path='/dashboard/stationmanagerAddexternalorder' element={<StationManagerAddExternalOrder/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
    </>
  )
}

export default App
