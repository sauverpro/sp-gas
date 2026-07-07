import React from "react";
import { useState } from "react";
import admin from "./AdminAdd.module.css";
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
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import admTariff from './AdminTariff.module.css'; 
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminAddEmptyBottles from "./AdminAddEmptyBottles";

const AdminStock = () => {

 // add Empty Bottles modal

  const [openBottle , setOpenBottle] = useState(false);
  function handleEmptyBottle()  {
         setOpenBottle(!openBottle);
  };

  // End Add Empty bottles  modal 

  const navigate = useNavigate();
  const [adminStockLoading , setAdminStockLoadig] = useState(false);
     
  // ============================== FETCH stock ==========================================

  const [adminStock , setAdminStock] = useState([]);
  const fetchAdminStock = () =>{
     setAdminStockLoadig(true);
     let token = localStorage.getItem("token");
     axios({
      method : "GET" ,
      url : "https://sp-gas-api.onrender.com/api/v1/adminStock/",
      headers : {
         Authorization : `Bearer ${token}`,
      },
     })
     .then((Response)=>{
      setAdminStockLoadig(false);
      console.log(Response);
      setAdminStock(Response.data);
     })
     .catch((error)=>{
      setAdminStockLoadig(false);
      console.log(error);
     })
  };

  useEffect(()=>{
    fetchAdminStock();
  }, []);

   // ==============================END FETCH stock =======================================

      // ============================== FETCH Admin stock Total Amount =======================================

 
// Calculate the total kilograms using reduce
const totalKilograms = adminStock.reduce((accumulator, product) => {
    return accumulator + product.productId.Kilograms;
}, 0);

console.log("Total Kilograms:", totalKilograms);

const purchasePrices = adminStock.map(product => product.purchasePrice);
console.log(purchasePrices);

const totalPriceForEachProduct = adminStock.map(product => product.purchasePrice * product.productId.Kilograms);
console.log(totalPriceForEachProduct);

const totalPriceForEachProdut = adminStock.map(product => product.purchasePrice * product.productId.Kilograms);

// Multiply each totalPrice with the sum of Empty and Full for each product
const finalPrices = totalPriceForEachProdut.map((totalPrice, index) => totalPrice * (adminStock[index].Full));
console.log(finalPrices);

const totalSumu = finalPrices.reduce((sum, price) => sum + price, 0);
console.log(totalSumu);

const formattedTotalSum = totalSumu.toLocaleString();
console.log(formattedTotalSum);
     // ============================== End FETCH Admin stock Total Amount =======================================

   
  // ==============================  PAGINATION  =======================================
    const [stockNumber, setStockNumber] = useState(0);
        const stockPerPage = 5;
        const stockVisited = stockNumber * stockPerPage;
        const dispalyStock = adminStock.slice(stockVisited,stockVisited + stockPerPage).map((product) => (
            <TableRow >
                <TableCell>
                <Typography
                    sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    }}
                >
                    {product?.productId?.Kilograms}
                </Typography>
                </TableCell>
                <TableCell>
                <Typography variant="h6">{product?.productId?.Type}</Typography>
                </TableCell>
                <TableCell >
                <Typography variant="h6">{product?.Full + product?.Empty}</Typography>
                </TableCell>
                <TableCell >
                <Typography variant="h6">{product?.Full}</Typography>
                </TableCell>
                <TableCell >
                <Typography variant="h6">{product?.Empty}</Typography>
                </TableCell>
                <TableCell align='center'>
                <Box  
                      sx={{
                        mt: {
                            lg: 0,
                            xs: 2,
                        },
                        }}> 
                             <Button
                            onClick={() => navigate(`/dashboard/adminstockdetails/${product._id}`)}
                            variant="contained"
                            color="success"
                            sx={{
                                mr: 1,
                                mb: 1,
                            }}
                            >
                               <FaEye className={admin.eye}/> 
                           View
                            </Button>
                         
                          
                         </Box>
              </TableCell>

            </TableRow>
            ));
            const stockCount = Math.ceil(adminStock.length / stockPerPage);
            const changeStock = ({ selected }) => {
              setStockNumber(selected);
            };

  // ==============================END pagination =======================================   

    return ( 
        <div>
            {openBottle && <AdminAddEmptyBottles closeBottle={() => setOpenBottle(false)}/>}
            <Card variant="outlined">     
          {adminStockLoading ? (  <PuffLoader className={admTariff.CircleLoader} color="#08C25E" size="340" />   ) : ( <CardContent>
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
                        Stock (Rwf {formattedTotalSum})
                        </Typography>           
                        </Box>

                        <Box  sx={{
                        marginLeft: "auto",
                        marginRight: "-360px",
                        mt: {
                            lg: 0,
                            xs: 2,
                        },
                        }}> 
                        
                             <Button
                            onClick={handleEmptyBottle}
                            variant="contained"
                            color="success"
                            sx={{
                                mr: 1,
                                mb: 1,
                            }}
                            >
                            +Add Empty Bottles
                            </Button>
                         
                          
                        </Box>

                        <Box  sx={{
                        marginLeft: "auto",
                        mt: {
                            lg: 0,
                            xs: 2,
                        },
                        }}> 
                        <Link to="/dashboard/adminaddstock"> <Button
                            variant="contained"
                            color="success"
                            sx={{
                                mr: 1,
                                mb: 1,
                            }}
                            >
                            +Add Stock
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
                    Type
                    </Typography>
                </TableCell>
   
                <TableCell >
                    <Typography color="textSecondary" variant="h6">
                    Total Cylinders
                    </Typography>
                </TableCell>

                <TableCell >
                    <Typography color="textSecondary" variant="h6">
                    Full Cylinders
                    </Typography>
                </TableCell>

                <TableCell >
                    <Typography color="textSecondary" variant="h6">
                    Empty Cylinders
                    </Typography>
                </TableCell>
                
                <TableCell align='center'>
                    <Typography color="textSecondary" variant="h6">
                    Action
                    </Typography>
                </TableCell>
                
                </TableRow>
            </TableHead>
            <TableBody>
              
                {dispalyStock}
            </TableBody>
                    </Table>
                </Grid>
                </Box>
                <div className={admin.downn}>
                        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={stockCount}
                onPageChange={changeStock}
                containerClassName={admin.paginationButtons}
                previousLinkClassName={admin.previousButton}
                nextLinkClassName={admin.nextButton}
                disabledClassName={admin.pageDisabled}
                activeClassName={admin.activePage}
              />
              </div>
            </CardContent>)}    
        </Card> 
        </div>
     );
}
 
export default AdminStock;