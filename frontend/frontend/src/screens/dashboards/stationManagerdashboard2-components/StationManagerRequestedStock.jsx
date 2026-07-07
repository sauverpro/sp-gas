import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import StationnagerExOrder from './StationManagerExternalOrder.module.css';
import staManaStock from './StationManagerStock.module.css'
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
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
import PuffLoader from "react-spinners/PuffLoader";

function StationManagerRequestedStock() {

  // ================================== Fetching Requested Stock =============================================    
  const navigate = useNavigate();
  const [stationLoading , setStationLoading] = useState(false);

  let data = localStorage.getItem("data");
  let user = JSON.parse(data);
 
  const [stationOrderss , setStationOrderss] = useState([]);
  const filterOrder = stationOrderss.filter(order => order.StationId._id === user.StationId );
  
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
   })
   .catch((error)=>{
    setStationLoading(false);
    console.log(error);
   })
  };

  useEffect(()=>{
    fetchStationOrders();
  },[]);

  // ================================== Fetching Requested Stock =============================================

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

  // ====================================  Pagination  ======================================================
  const [stationExternalNumber, setStationExternalNumber] = useState(0);
  const stationExternalPerPage = 4;
  const stationExternalVisited = stationExternalNumber * stationExternalPerPage;
  const displayManExternalOrder = filterOrder?.slice(stationExternalVisited, stationExternalVisited + stationExternalPerPage).map((Oruder) => 
  (
    <TableRow >
        <TableCell>
        <Typography
            sx={{
            fontSize: "15px",
            fontWeight: "500",
            }}
        >
            {Oruder?.ProductId?.Kilograms}
        </Typography>
        </TableCell>
        <TableCell>
        <Typography 
                sx={{
                fontSize: "13px",
                }}
            >
                {Oruder?.ProductId?.Type}
            </Typography>
        </TableCell>
        <TableCell>
        <Typography  variant="h6">
           {Oruder?.Quantity}
        </Typography>
        </TableCell>
        <TableCell align='center'>
                <Chip className={StationnagerExOrder.chip}
                    sx={{
                    pl: "4px",
                    pr: "4px",
                    ...getStatusColor(Oruder?.Status),
                    }}
                    size="small"
                    label={Oruder?.Status}
                ></Chip>
                </TableCell>
        </TableRow>
  ));
      const stationExternalCount = Math.ceil(filterOrder.length / stationExternalPerPage);
      const changeStationExternal = ({ selected }) => {
        setStationExternalNumber(selected);
      };

// ====================================  END Pagination  ======================================================  

  return (
    <Card variant="outlined">
    {stationLoading ? (<PuffLoader className={staManaStock.CircleLoader} color="#08C25E" size="340" />) : (
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
                        Requested Stocks
                      </Typography>
                      </Box>

                      <Box  sx={{
                      marginLeft: "auto",
                      mt: {
                          lg: 0,
                          xs: 2,
                      },
                      }}> 
                      <Link to="/dashboard/stationmanagerrequestStock">
                           <Button
                          variant="contained"
                          color="success"
                          sx={{
                              mr: 1,
                              mb: 1,
                          }}
                          >
                          + Request Stock
                          </Button>
                          </Link>        
                       </Box>
              </Box>
              <Box  sx={{
              overflow: "auto",
              mt: 3,
                   }}>
               <Grid container spacing={0} >
                  <Table  
              aria-label="simple table"
              sx={{
                  mt: 3,
                  whiteSpace: "nowrap",
              }}
              >
          <TableHead >
              <TableRow  >
              <TableCell>
                  <Typography color="textSecondary" variant="h6">
                  Size
                  </Typography>
              </TableCell>
              <TableCell>
                  <Typography color="textSecondary" variant="h6">
                  Type
                  </Typography>
              </TableCell>
            
              <TableCell >
                  <Typography color="textSecondary" variant="h6">
                  Total Order
                  </Typography>
              </TableCell><TableCell >
                  <Typography color="textSecondary" variant="h6" align="center">
                  Status
                  </Typography>
              </TableCell>
             
              </TableRow>
          </TableHead>
          <TableBody>
              {displayManExternalOrder} 
          </TableBody>
                  </Table>
              </Grid>
              </Box>
                  <div className={StationnagerExOrder.downn}>
                      <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              pageCount={stationExternalCount}
              onPageChange={changeStationExternal}
              containerClassName={StationnagerExOrder.paginationButtons}
              previousLinkClassName={StationnagerExOrder.previousButton}
              nextLinkClassName={StationnagerExOrder.nextButton}
              disabledClassName={StationnagerExOrder.pageDisabled}
              activeClassName={StationnagerExOrder.activePage}
            />
            </div>
          </CardContent>
    )}     
      </Card>
  )
}

export default StationManagerRequestedStock
