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

} from "@material-ui/core";
import PuffLoader from "react-spinners/PuffLoader";

function StationManagerExternalOrder() {

  const [externalOrdersLoading , setExternalOrdersLoading] = useState(false);

// ====================================  Fetching External Orders  ===========================================
  
  const navigate = useNavigate();
  const [manaExternalOrders, setManaExternalorders] = useState([]);
  let token = localStorage.getItem("token");

  let data = localStorage.getItem("data");
  let user = JSON.parse(data);

  const fetchManaExternalOrders= () => {
    setExternalOrdersLoading(true);
    axios({
      method : "GET",
      url : `https://sp-gas-api.onrender.com/api/v1/extOrder/station/${user.StationId}`,
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json",
      },
    })
    .then((Response) => {
      setExternalOrdersLoading(false);
      setManaExternalorders(Response.data);
    })
    .catch((error) => {
      setExternalOrdersLoading(false);
      console.log(error);
    })
  };
  useEffect(() => {
    fetchManaExternalOrders()
  }, []);

// ================================= End Fetching External Orders  ===========================================
  

// ====================================  Pagination  ======================================================
  const [stationExternalNumber, setStationExternalNumber] = useState(0);
  const stationExternalPerPage = 4;
  const stationExternalVisited = stationExternalNumber * stationExternalPerPage;
  console.log(manaExternalOrders);
  const displayManExternalOrder = manaExternalOrders?.slice(stationExternalVisited, stationExternalVisited + stationExternalPerPage).map((extOrder) => 
  (
    <TableRow >
        <TableCell>
        <Typography
            sx={{
            fontSize: "15px",
            fontWeight: "500",
            }}
        >
            {extOrder?.FullName}
        </Typography>
        </TableCell>
        <TableCell>
        <Typography 
                sx={{
                fontSize: "13px",
                }}
            >
                {extOrder?.PhoneNumber}
            </Typography>
        </TableCell>
        <TableCell>
        <Typography  variant="h6">
            {extOrder?.ProductId?.Kilograms}
        </Typography>
        </TableCell>
       
        <TableCell >
        <Typography variant="h6">
          {extOrder?.ProductId?.Type}
          </Typography>
        </TableCell>
        <TableCell>
        <Box  
        sx={{
                  mt: {
                      lg: 0,
                      xs: 2,
                  },
                  }}> 
                       <Button
                      onClick={() => navigate(`/dashboard/stationmanagerexternalorderdetail/${extOrder._id}`)}
                      variant="contained"
                      color="success"
                      sx={{
                          mr: -5,
                          mb: 1,
                      }}
                      >
                         <FaEye className={StationnagerExOrder.eye}/> 
                     View
                      </Button>
                    
                   </Box>
        </TableCell>
        </TableRow>
  ));

      const stationExternalCount = Math.ceil(manaExternalOrders.length / stationExternalPerPage);
      const changeStationExternal = ({ selected }) => {
        setStationExternalNumber(selected);
      };

// ====================================  END Pagination  ======================================================      

  return (
    <Card variant="outlined">
      {externalOrdersLoading ? (<PuffLoader className={staManaStock.CircleLoader} color="#08C25E" size="340" />) : (
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
                          Station External Orders
                        </Typography>
                        </Box>

                        <Box  sx={{
                        marginLeft: "auto",
                        mt: {
                            lg: 0,
                            xs: 2,
                        },
                        }}> 
                        <Link to="/dashboard/stationmanagerAddexternalorder">
                             <Button
                            variant="contained"
                            color="success"
                            sx={{
                                mr: 1,
                                mb: 1,
                            }}
                            >
                            + Add External Order
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
                    Client Name
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                    Phone Number
                    </Typography>
                </TableCell>
              
                <TableCell >
                    <Typography color="textSecondary" variant="h6">
                    Kilograms
                    </Typography>
                </TableCell><TableCell >
                    <Typography color="textSecondary" variant="h6" align="center">
                    Type
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography color="textSecondary" variant="h6" align="center">
                    Action
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

export default StationManagerExternalOrder
