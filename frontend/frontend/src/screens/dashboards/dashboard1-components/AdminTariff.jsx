import React from 'react';
import admTariff from './AdminTariff.module.css';
import { useState , useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  
  } from "@material-ui/core";
import axios from 'axios';
import PuffLoader from "react-spinners/PuffLoader";
import AdminEditUnitPrice from './AdminEditUnitPrice';
import AdminEditDeliveryFee from './AdminEditDeliveryFee';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AdminTariff() {

// ============================== edit unit modal ==============================
  const [openEditUnit , setOpenEditUnit] = useState(false);
  function handleEditu()  {
         setOpenEditUnit(!openEditUnit);
  };

// ================= End edit unit modal ==============================

// ============================== edit Delivery fee modal ==============================
     const [openEditDelivery , setOpenEditDelivery] = useState(false);
     function handleEditDe()  {
            setOpenEditDelivery(!openEditDelivery);
     };
//  ============================== End edit Delivery fee modal ==============================

    const [tarrifLoading , setTarrifLoadig] = useState(false);
    const navigate = useNavigate();

// =========================== Unit Price Fetching  ==================================

 const [tarriff , setTarriff] = useState([]);
 const fetchTarriff = () => {
    let token = localStorage.getItem("token");
    axios({
        method : "GET",
        url: "https://sp-gas-api.onrender.com/api/v1/tariff/latest",
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json; charset=utf-8",
        }
    })
    .then((Response)=>{
        setTarriff(Response.data.data);
    })
    .catch((error)=>{
        console.log(error);
    })
 };
 useEffect(()=>{
    fetchTarriff();
 },[]);

 const unitPrice = tarriff?.Price;
 const changedUnitPrice = unitPrice?.toLocaleString();

// =========================== End Unit Price Fetching  ==============================


// =========================== Product Fetching  ==============================

    const [tarrifs, setTarrifs] = useState([]);
    let token = localStorage.getItem("token");
    const fetchTarrifs = () => {
        setTarrifLoadig(true);
        axios({
            method: "GET",
            url: "https://sp-gas-api.onrender.com/api/v1/product",
            headers : {
                Authorization : `Bearer ${token}` ,
                "Content-Type" : "application/json; charset=utf-8",
            },
        })
        .then((Response) =>{
            setTarrifLoadig(false);
            setTarrifs(Response?.data?.data);
        })
        .catch((error) => {
            console.log(error);
            setTarrifLoadig(false);
        });
    }

    useEffect(()=>{
        fetchTarrifs();
    },[]);

// =========================== END Product Fetching  ==========================

// =============================    Fetch Delivery Fees ====================================

const [deliveryFee , setDeliveryFee] = useState([]);

const fetchDelivery = () =>{
  let token = localStorage.getItem("token");
      axios({
        method : "GET",
        url : "https://sp-gas-api.onrender.com/api/v1/deliveryfee/getAllDelFee",
        headers : {
          Authorization : `Bearer ${token}`,
        },
      })
      .then((Response)=>{
        setDeliveryFee(Response?.data?.Amount[0]?.Amount);
      })
      .catch((error)=>{
        console.log(error);
      })
}
useEffect(()=>{
   fetchDelivery();
},[]);

const changedDeliveryFee = deliveryFee?.toLocaleString();

// =============================  End  Fetch Delivery Fees ====================================

//============================= Pagination ===================================
    const [tariffsNumber, setTariffsNumber] = useState(0);
    const tariffsPerPage = 5;
    const tariffsVisited = tariffsNumber * tariffsPerPage;
    const displayAdminTariff = tarrifs?.slice(tariffsVisited, tariffsVisited + tariffsPerPage).map((tarif) =>
      (
        <TableRow>
                <TableCell>
                <Typography
                    sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    mr: 10,
                    }}
                >
                    {tarif.Kilograms}
                </Typography>
                </TableCell>
                <TableCell>
                <Typography
                        
                        sx={{
                        fontSize: "13px",
                        mr: 10,
                        }}
                    >
                         {`${(tarriff.Price * tarif.Kilograms).toLocaleString()} Rwf`} 
                    </Typography>
                </TableCell>
                <TableCell>
                <Typography  variant="h6"
                        
                >
                    {tarif.Type}
                </Typography>
                </TableCell>
               
                <TableCell align="right">
                   
                    <Button
                    onClick={() => {navigate(`/dashboard/admintariffdetail/${tarif._id}`)}}
                    variant="contained"
                    color="success"
                    sx={{
                        mr: 0,
                        mb: 1,
                    }}
                    >
                    <FaEye className={admTariff.eye}/>
                        View
                    </Button>
               
                </TableCell>
            </TableRow>
            ));

            const tariffsCount = Math.ceil(tarrifs.length / tariffsPerPage);
            const changeTariffs = ({ selected }) => {
                setTariffsNumber(selected);
            };

//============================= END Pagination ===================================
      
  return (
    <div>
        <Card>
            <CardContent>
                <Box 
                 sx={{
                    display: {
                      sm: "flex",
                      xs: "block",
                    },
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <div className={admTariff.pContainer}>
                        <p>Unit Price</p>
                        <p className={admTariff.prix}> {changedUnitPrice} Rwfs/kg</p>
                        <button className={admTariff.editP} onClick={handleEditu}>Update</button>
                       </div>
                       {openEditUnit && <AdminEditUnitPrice closeEditu={() => setOpenEditUnit(false)}/>}
                       <div className={admTariff.pContainer}>
                        <p>Delivery Fee</p>
                        <p className={admTariff.prix}> {changedDeliveryFee} Rwfs</p>
                        <button className={admTariff.editP} onClick={handleEditDe}>Update</button>
                       </div>  
                       {openEditDelivery && <AdminEditDeliveryFee closeEditde={() => setOpenEditDelivery(false)}/>}
                  </Box>          
                </Box>
            </CardContent>
        </Card>
        <Card variant="outlined">
            {tarrifLoading ? ( <PuffLoader className={admTariff.CircleLoader} color="#08C25E" size="340" /> ) : (
                 <CardContent>
                <Box
                  sx={{
                    display: {
                      sm: "flex",
                      xs: "block",
                    },
                    alignItems: "flex-start",
                  }}
                >
                        <Box>
                        <Typography
                        variant="h3"
                        sx={{
                            marginBottom: "0",
                        }}
                        gutterBottom
                        >
                        Tarrifs
                        </Typography>
                       
                        </Box>
                        <Box  sx={{
                        marginLeft: "auto",
                        mt: {
                            lg: 0,
                            xs: 2,
                        },
                        }}> 
                        <Link to="/dashboard/adminaddtariff"> <Button
                            variant="contained"
                            color="success"
                            sx={{
                                mr: 1,
                                mb: 1,
                            }}
                            >
                            + Add Tarrif
                            </Button></Link>
                          
                         </Box>
                </Box>
                <Box  sx={{
                overflow: "auto",
                mt: 3,
                     }}>
                 <Grid container spacing={0}>
                    <Table
                aria-label="simple table"
                sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                }}
                >
            <TableHead>
                <TableRow>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Kilograms
                    </Typography>
                </TableCell>
              
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Total Price
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Type
                    </Typography>
                </TableCell>
              
                <TableCell align="right">
                    <Typography color="textSecondary" variant="h6" mr="20px">
                        Action
                    </Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {displayAdminTariff}
            </TableBody>
                    </Table>
                </Grid>
                </Box>
                <div className={admTariff.tariffPagination}>
                        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    pageCount={tariffsCount}
                    onPageChange={changeTariffs}
                    containerClassName={admTariff.paginationButtons}
                    previousLinkClassName={admTariff.previousButton}
                    nextLinkClassName={admTariff.nextButton}
                    disabledClassName={admTariff.pageDisabled}
                    activeClassName={admTariff.activePage}
                    />
                </div>
            </CardContent>
            )}  
            <ToastContainer/>     
        </Card>
    </div>
  )
}

export default AdminTariff
