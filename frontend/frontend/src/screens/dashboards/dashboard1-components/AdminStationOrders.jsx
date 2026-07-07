import React from 'react';
import adminStationOrders from './AdminStationOrders.module.css'
import stations from "./AdminStations.module.css" ;
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
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
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";


function AdminStationOrders() {

// ============================== Fetching External Orders ==================================================    
  const navigate = useNavigate();
  const [stationLoading , setStationLoading] = useState(false);

  const [stationOrderss , setStationOrderss] = useState([]);

  const fetchStationOrders = () =>{
   setStationLoading(true);
   let token = localStorage.getItem("token");
   axios({
    method: "GET",
    url : "https://sp-gas-api.onrender.com/api/v1/stOrder/getStOrder",
    headers : {
        Authorization : `Bearer ${token}`,
    },
   })
   .then((Response)=>{
    setStationLoading(false);
    setStationOrderss(Response.data.readStOrders);
    console.log(Response);
   })
   .catch((error)=>{
    setStationLoading(false);
    console.log(error);
   })
  };

  useEffect(()=>{
    fetchStationOrders();
  },[]);



// ============================== End Fetching External Orders ==================================================

// ============================== Status Color ==================================================

const getStatusColor = (Status) => {
    switch (Status) {
      case 'Approved':
        return {
            backgroundColor: 'green',
            color: 'white',
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

// ============================== End Status Color ==================================================

// ==============================   Pagination ============================================================
    
    const [stationsOrdersNumber, setStationsOrdersNumber] = useState(0);
    const stationsOrdersPerPage = 5;
    const stationsOrdersVisited = stationsOrdersNumber * stationsOrdersPerPage;
    const dispalyStationsOrders = stationOrderss?.slice(stationsOrdersVisited, stationsOrdersVisited + stationsOrdersPerPage).map((order) => 
        (
            <TableRow>
            <TableCell>
            <Typography
                sx={{
                fontSize: "15px",
                fontWeight: "500",
                }}
            >
                {order?.StationId?.StationName}
            </Typography>
            </TableCell>
            <TableCell>
            <Typography
                    sx={{
                    fontSize: "13px",
                    }}
                >
                    {order?.ProductId?.Kilograms}
                </Typography>
            </TableCell>
            <TableCell>
            <Typography  variant="h6">
             {order?.ProductId?.Type}
            </Typography>
            </TableCell>
            <TableCell>
            <Typography  variant="h6">
             {order?.Quantity}
            </Typography>
            </TableCell>
            <TableCell align='center'>
                <Chip 
                    sx={{
                    pl: "4px",
                    pr: "4px",
                    ...getStatusColor(order?.Status),
                    }}
                    size="small"
                    label={order?.Status}
                ></Chip>
            </TableCell>
            <TableCell align="right">
                 <Button
                 onClick={() =>navigate(`/dashboard/adminstationordersdetail/${order._id}`)}
                variant="contained"
                color="success"
                sx={{
                    mr: 0,
                    mb: 1,
                }}
                >
                   <FaEye className={adminStationOrders.eye}/>
               View
                </Button>
           
            </TableCell>
        </TableRow>
    )
    );

    const stationsOrdersCount = Math.ceil(stationOrderss.length / stationsOrdersPerPage);
    const changeStationsOrders = ({ selected }) => {
      setStationsOrdersNumber(selected);
    };

 // ==============================  End Pagination ============================================================   

  return (
    <Card variant="outlined">
        {stationLoading ? (<PuffLoader className={stations.CircleLoader} color="#08C25E" size="340" />) : (
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
                        Station Orders
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
                        Station Name 
                    </Typography>
                </TableCell>
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
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Total Orders
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
                {dispalyStationsOrders}
            </TableBody>
                    </Table>
                   
                </Grid>
                </Box>
                <div className={adminStationOrders.downn}>
                        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={stationsOrdersCount}
                onPageChange={changeStationsOrders}
                containerClassName={adminStationOrders.paginationButtons}
                previousLinkClassName={adminStationOrders.previousButton}
                nextLinkClassName={adminStationOrders.nextButton}
                disabledClassName={adminStationOrders.pageDisabled}
                activeClassName={adminStationOrders.activePage}
              />
              </div>
            </CardContent>
        )}
           
        </Card>
  )
}

export default AdminStationOrders
