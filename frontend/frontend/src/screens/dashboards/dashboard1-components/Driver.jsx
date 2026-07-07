import React from 'react'
import { useState } from 'react'
import transporter from './Driver.module.css'
import stations from "./AdminStations.module.css" ;
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
  import { FaEye } from "react-icons/fa";
  import { useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import PuffLoader from "react-spinners/PuffLoader";

function Driver() {

  const navigate = useNavigate();

  const [driverLoading , setDriverLoading] = useState(false);

   // ================================== fetch Drivers ===============================
   
   const [users , setUsers] = useState([]);
   const filterDriver = users.filter(driver => driver.Role === "Driver" );
   console.log(filterDriver ,"drivers");
   
   const fetchUsers = () =>{
    let token = localStorage.getItem("token");
    setDriverLoading(true);
    axios({
      method : "GET",
      url : "https://sp-gas-api.onrender.com/api/v1/users",
      headers : {
        Authorization : `Bearer ${token}`,
      },
    })
    .then((Response)=>{
      setDriverLoading(false);
      console.log(Response);
      setUsers(Response.data.data);
      
    })
    .catch((error)=>{
      setDriverLoading(false);
      console.log(error);
    })
   };
   useEffect(()=>{
    fetchUsers();
   },[]);

    // ============================= END fetch Drivers =================================
    
    const [deliverNumber, setDeliverNumber] = useState(0);
    const deliverPerPage = 4;
    const deliverVisited = deliverNumber * deliverPerPage;
  
    const displayManExternalOrder = filterDriver.slice(deliverVisited, deliverVisited + deliverPerPage).map((drive) => 
    (
      <TableRow>
          <TableCell>
          <Typography
              sx={{
              fontSize: "15px",
              fontWeight: "500",
              }}
          >
              {drive.FullNames}
          </Typography>
          </TableCell>
          <TableCell>
          <Typography
                  
                  sx={{
                  fontSize: "13px",
                  }}
              >
                  {drive.IdNumber}
              </Typography>
          </TableCell>
        
          <TableCell>
          <Typography  variant="h6">
              {drive.Email}
          </Typography>
          </TableCell>
         
          <TableCell >
          <Typography variant="h6">
            {drive.PhoneNumber[0]}
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
                        onClick={() => navigate(`/dashboard/driverdetail/${drive._id}`)}
                        variant="contained"
                        color="success"
                        sx={{
                            mr: -4,
                            mb: 1,
                        }}
                        >
                           <FaEye className={transporter.eye}/> 
                       View 
                        </Button>
                      
                     </Box>
          </TableCell>
          </TableRow>
    ));

    const stationExternalCount = Math.ceil(filterDriver.length / deliverPerPage);
    const changeStationExternal = ({ selected }) => {
      setDeliverNumber(selected);
    };
  return (
    <Card variant="outlined">
      {driverLoading ? (<PuffLoader className={stations.CircleLoader} color="#08C25E" size="340" /> ) : ( 
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
                    Drivers
                  </Typography>
                  </Box>

                  <Box  sx={{
                  marginLeft: "auto",
                  mt: {
                      lg: 0,
                      xs: 2,
                  },
                  }}> 
                  <Link to="/dashboard/AddDriver">
                       <Button
                      variant="contained"
                      color="success"
                      sx={{
                          mr: 1,
                          mb: 1,
                      }}
                      >
                      + Add New Driver
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
               Driver Name
              </Typography>
          </TableCell>
          <TableCell>
              <Typography color="textSecondary" variant="h6">
               Driver ID
              </Typography>
          </TableCell>
         
          <TableCell>
              <Typography color="textSecondary" variant="h6">
               Email
              </Typography>
          </TableCell>
        
          <TableCell >
              <Typography color="textSecondary" variant="h6">
               Phone Number
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
              <div className={transporter.downn}>
                  <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={stationExternalCount}
          onPageChange={changeStationExternal}
          containerClassName={transporter.paginationButtons}
          previousLinkClassName={transporter.previousButton}
          nextLinkClassName={transporter.nextButton}
          disabledClassName={transporter.pageDisabled}
          activeClassName={transporter.activePage}
        />
        </div>
      </CardContent>
       )}
          
        </Card>
  
  )
}

export default Driver
