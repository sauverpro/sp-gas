import React from 'react'
import external from "./AdminExternalOrders.module.css";
import staManaStock from '../stationManagerdashboard2-components/StationManagerStock.module.css';
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
  } from "@material-ui/core";
  import { Link } from "react-router-dom";
  import ReactPaginate from "react-paginate";
  import { FaEye } from "react-icons/fa";
  import { useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import PuffLoader from "react-spinners/PuffLoader"

function AdminExternalOrders() {


      const [externalOrdersLoading , setExternalOrdersLoading] = useState(false);

      // ====================================  Fetching External Orders  ===========================================
        
        const navigate = useNavigate();

        const [manaExternalOrders, setManaExternalorders] = useState([]);
        let token = localStorage.getItem("token");
        const fetchManaExternalOrders= () => {
          setExternalOrdersLoading(true);
          axios({
            method : "GET",
            url : "https://sp-gas-api.onrender.com/api/v1/extOrder/getExtOrder",
            headers : {
              Authorization : `Bearer ${token}`,
              "Content-Type" : "application/json",
            },
          })
          .then((Response) => {
            setExternalOrdersLoading(false);
            setManaExternalorders(Response.data.Orders);
           
          })
          .catch((error) => {
            setExternalOrdersLoading(false);
            console.log(error);
          })
        };
        useEffect(() => {
          fetchManaExternalOrders()
        }, []);
      
  // ================================= End Fetching External Orders  =========================================
  
  

// ========================== PAGINATION =====================================================================
      const [externalNumber, setExternalNumber] = useState(0);
      const externalPerPage = 5;
      const externalVisited = externalNumber * externalPerPage;
      const dispalyExternal = manaExternalOrders?.slice(externalVisited, externalVisited + externalPerPage).map((extOrder)=> (
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
       
        <TableCell >
        <Typography variant="h6">
          {extOrder?.StationId?.StationName}
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
                      onClick={() => navigate(`/dashboard/adminexternalorderdetails/${extOrder._id}`)}
                      variant="contained"
                      color="success"
                      sx={{
                          mr: 1,
                          mb: 1,
                      }}
                      >
                         <FaEye className={external.eye}/> 
                     View
                      </Button>
                     
                    
                   </Box>
        </TableCell>
        </TableRow>

      ));
      const externalCount = Math.ceil(manaExternalOrders.length / externalPerPage);
      const changeExternal = ({ selected }) => {
        setExternalNumber(selected);
      };

// ========================== PAGINATION =====================================================================      

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
                        External Orders
                        </Typography>
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
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                    Kilograms
                    </Typography>
                </TableCell>
              
                <TableCell >
                    <Typography color="textSecondary" variant="h6">
                    Type
                    </Typography>
                </TableCell>
               
                <TableCell >
                    <Typography color="textSecondary" variant="h6">
                    Station Name
                    </Typography>
                </TableCell>

                <TableCell >
                    <Typography color="textSecondary" variant="h6">
                    Action
                    </Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dispalyExternal} 
            </TableBody>
                    </Table>
                </Grid>
                </Box>
                    <div className={external.downn}>
                        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={externalCount}
                onPageChange={changeExternal}
                containerClassName={external.paginationButtons}
                previousLinkClassName={external.previousButton}
                nextLinkClassName={external.nextButton}
                disabledClassName={external.pageDisabled}
                activeClassName={external.activePage}
              />
              </div>
            </CardContent>
      ) }
          
        </Card>
  )
}

export default AdminExternalOrders
