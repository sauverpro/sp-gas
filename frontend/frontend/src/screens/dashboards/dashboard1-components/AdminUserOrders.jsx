import React from 'react'
import adminuser from "./AdminUserOrders.module.css";
import stations from "./AdminStations.module.css" ;
import { useState } from "react";
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
  
  import { Link } from "react-router-dom";
  import ReactPaginate from "react-paginate";
  import { FaEye } from "react-icons/fa";
  import { useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import PuffLoader from "react-spinners/PuffLoader";

const AdminUserOrders = () => {

      const [userOrdersLoading , setUserOrdersLoading] = useState(false);
      const navigate = useNavigate();
      
// ======================= fETCHING User Orders ==================================================================

  const [userOrders , setUserOrders] = useState([]);
  const fetchUserOrders = () => {
    setUserOrdersLoading(true);
    let token = localStorage.getItem("token");
    axios({
      method : "GET",
      url : "https://sp-gas-api.onrender.com/api/v1/order/getOrder",
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json",
      },
    })
    .then((Response)=>{
      setUserOrdersLoading(false);
      console.log(Response ,"yyyyyyyyyyyyyyyyyyyy");
      setUserOrders(Response.data);
    })
    .catch((error)=>{
      setUserOrdersLoading(false);
      console.log(error);
    })
  };

  useEffect(()=>{
    fetchUserOrders();
  },[]);

// ======================= END fETCHING User Orders ==============================================================

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


 // ======================= PAGINATION ===========================================================================

      const [userOrdersNumber, setUserOrdersNumber] = useState(0);
      const userOrdersPerPage = 5;
      const userOrdersVisited = userOrdersNumber * userOrdersPerPage;
      const displayUserOrders = userOrders?.slice(userOrdersVisited, userOrdersVisited + userOrdersPerPage).map((sitation)=> (
        <TableRow >
        <TableCell>
        <Typography
            sx={{
            fontSize: "15px",
            fontWeight: "500",
            }}
        >
            {sitation?.CartId?.UserId?.FullNames}
        </Typography>
        </TableCell>
        <TableCell>
        <Typography
                
                sx={{
                fontSize: "13px",
                }}
            >
                {sitation?.phoneNumber}
        </Typography>
        </TableCell>
        <TableCell>
        <Typography  variant="h6">
            {sitation?.address}
        </Typography>
        </TableCell>
        <TableCell align='center'>
                <Chip className={adminuser.chip}
                    sx={{
                    pl: "4px",
                    pr: "4px",
                    ...getStatusColor(sitation?.Status),
                    }}
                    size="small"
                    label={sitation?.Status}
                ></Chip>
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
                    onClick={() => navigate(`/dashboard/adminuserorderdetails/${sitation._id}`)}
                    variant="contained"
                    color="success"
                    sx={{
                        mr: 1,
                        mb: 1,
                    }}
                    >
                        <FaEye className={adminuser.eye}/> 
                    View
                    </Button> 
                </Box>
        </TableCell>
         </TableRow>

      ));

      const userOrdersCount = Math.ceil(userOrders.length / userOrdersPerPage);
      const changeUserOrders = ({ selected }) => {
        setUserOrdersNumber(selected);
      };

 // ======================= END PAGINATION ===========================================================================
  return (
    <Card variant="outlined">
      {userOrdersLoading ? (<PuffLoader className={stations.CircleLoader} color="#08C25E" size="340" />) : (
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
                        User Orders
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
                    Full Name
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                    Phone Number
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                    Location
                    </Typography>
                </TableCell>

                <TableCell align='center' >
                    <Typography color="textSecondary" variant="h6">
                    Status
                    </Typography>
                </TableCell>
                <TableCell align='center' >
                    <Typography color="textSecondary" variant="h6">
                    Action
                    </Typography>
                </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
              
             {displayUserOrders}
            </TableBody>
                    </Table>
                </Grid>
                </Box>
                    <div className={adminuser.downn}>
                        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={userOrdersCount}
                onPageChange={changeUserOrders}
                containerClassName={adminuser.paginationButtons}
                previousLinkClassName={adminuser.previousButton}
                nextLinkClassName={adminuser.nextButton}
                disabledClassName={adminuser.pageDisabled}
                activeClassName={adminuser.activePage}
              />
              </div>
            </CardContent>
      )}
          
        </Card>
  )
}

export default AdminUserOrders
