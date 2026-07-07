import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import stationManaAssignOrder from './StationManagerAssignedOrder.module.css'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import PuffLoader from "react-spinners/PuffLoader";
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
  Chip,
  } from "@material-ui/core";

function StationManagerAssignedOrder() {

  // ========================== Fetch Assigned Orders ======================================  
    
    const [managerAssignedOrderLoading, setManagerAssignedOrderLoadig] = useState(false);
    const navigate = useNavigate();

    const [manaAssignedOrders, setManaAssignedOrders] = useState([]);

    const fectchManaAssignedOrders = () =>{

    setManagerAssignedOrderLoadig(true);

    let data = localStorage.getItem("data");
    let user = JSON.parse(data);

    let token = localStorage.getItem("token");

    axios({
        method : "GET",
        url : `https://sp-gas-api.onrender.com/api/v1/order/by-station/${user.StationId}`,
        headers : {
            Authorization : `Bearer ${token}`,
            "content-type" : "application/json",
        },
    })
    .then((response) => {
        setManagerAssignedOrderLoadig(false);
        setManaAssignedOrders(response.data);
    })
    .catch((error) => {
        setManagerAssignedOrderLoadig(false);
        console.log(error);
    })

};
useEffect(() => {
    fectchManaAssignedOrders();
}, []);

 // ========================== Fetch Assigned Orders ====================================== 

    // ============================== Status Color ==================================================

const getStatusColor = (Status) => {
    switch (Status) {
      case 'Completed':
        return {
            backgroundColor: 'green',
            color: 'white',
          };
      case 'Delivering':
            return {
                backgroundColor: 'blue',
                color: 'white',
              };
      case 'Processing':
                return {
                    backgroundColor: 'grey',
                    color: 'black',
                    fontWeight: "900",
                  };        
      case 'Cancelled':
        return {
            backgroundColor: 'red',
            color: 'white',
          };
      case 'Pending':
        return {
            backgroundColor: 'yellow',
            color: 'black',
            fontWeight: "900",
          };
      default:
        return {
            backgroundColor: 'RGB(0, 22, 37)',
            color: '#fff',
          };
    }
  };
  
  // ============================== End Status Color ============================================================


  // ========================== Pagination =============================================== 
    
  const [stationOrderNumber, setStationOrderNumber] = useState(0);
  const stationOrderPerPage = 4;
  const stationOrderVisited = stationOrderNumber * stationOrderPerPage;

  const displayStationManaOrder = manaAssignedOrders.slice(stationOrderVisited, stationOrderVisited + stationOrderPerPage).map((smfo) => 
  (
     <TableRow>
            <TableCell>
            <Typography
                sx={{
                fontSize: "15px",
                fontWeight: "500",
                }}
            >
                {smfo?.CartId?.UserId?.FullNames}
            </Typography>
            </TableCell>
            <TableCell>
            <Typography
                    sx={{
                    fontSize: "13px",
                    }}
                >
                    {smfo?.address}
                </Typography>
            </TableCell>
            <TableCell>
            <Typography  variant="h6">
             {smfo?.phoneNumber}
            </Typography>
            </TableCell>
            <TableCell align='center'>
                <Chip 
                    sx={{
                    pl: "4px",
                    pr: "4px",
                    ...getStatusColor(smfo?.Status),
                    }}
                    size="small"
                    label={smfo?.Status}
                ></Chip>
                </TableCell>
            <TableCell align="right">
                
                 <Button
                       onClick={() => navigate(`/dashboard/stationmanagerViewassignedorder/${smfo._id}`)}
                variant="contained"
                color="success"
                sx={{
                    mr: 0,
                    mb: 1,
                }}
                >
                   <FaEye className={stationManaAssignOrder.eye}/>
               View
                </Button>
            </TableCell>
        </TableRow>
  ));

  const stationOrderCount = Math.ceil(manaAssignedOrders.length / stationOrderPerPage);
  const changeStationOrder = ({ selected }) => {
    setStationOrderNumber(selected);
  };
 
   // ========================== End Pagination =============================================== 



  return (
    <Card variant="outlined">
         {managerAssignedOrderLoading ? (  <PuffLoader className={stationManaAssignOrder.CircleLoader} color="#08C25E" size="340" />   ) : (
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
                        Station Assigned Orders
                        </Typography>
                        </Box>

                        <Box  sx={{
                        marginLeft: "auto",
                        mt: {
                            lg: 0,
                            xs: 2,
                        },
                        }}> 
                          
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
                        Client Name
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Client Location
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Phone Number
                    </Typography>
                </TableCell>

                <TableCell align='center'>
                    <Typography color="textSecondary" variant="h6">
                        Status
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
                {displayStationManaOrder}
            </TableBody>
                    </Table>
                   
                </Grid>
                </Box>
                <div className={stationManaAssignOrder.downn}>
                        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={stationOrderCount}
                onPageChange={changeStationOrder}
                containerClassName={stationManaAssignOrder.paginationButtons}
                previousLinkClassName={stationManaAssignOrder.previousButton}
                nextLinkClassName={stationManaAssignOrder.nextButton}
                disabledClassName={stationManaAssignOrder.pageDisabled}
                activeClassName={stationManaAssignOrder.activePage}
              />
              </div>
            </CardContent>
            )}
        </Card>
  )
}

export default StationManagerAssignedOrder
