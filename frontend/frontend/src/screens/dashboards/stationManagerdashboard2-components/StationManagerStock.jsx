import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import PuffLoader from "react-spinners/PuffLoader"
import staManaStock from './StationManagerStock.module.css'
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

function StationManagerStock() {

// =============================================  Manager Stock Fetching  ==================================================
  
  const [managerStockLoading , setManagerStockLoadig] = useState(false);
  const [manasStock, setManaStock] = useState([]);
  const fetchManagerStock = () => {
    setManagerStockLoadig(true);
    let token = localStorage.getItem("token");
    console.log(token, "helloToken!!!");

    let data = localStorage.getItem("data");
    let user = JSON.parse(data);
    console.log(user);

    axios({
      method : "GET",
      url : `https://sp-gas-api.onrender.com/api/v1/stock/station/${user.StationId}`,
      headers : {
        Authorization : `Bearer ${token}`,
        "content-type" : "application/json",
      },
    })
    .then((Response) => {
      setManagerStockLoadig(false);
      setManaStock(Response.data);
    })
    .catch((error) => {
      setManagerStockLoadig(false);
      console.log(error);
    })
  };

  useEffect(() => {
    fetchManagerStock();
  }, []);


// =============================================  Manager Stock Fetching  ==================================================


// =============================================  PAGINATION ==================================================
  
  const [stationStockNumber, setStationStockNumber] = useState(0);
  const stationStockPerPage = 4;
  const stationStockVisited = stationStockNumber * stationStockPerPage;

  const displayStaManagerStock = manasStock?.slice(stationStockVisited, stationStockVisited + stationStockPerPage).map((manStock) => ( 
    <TableRow>
                <TableCell>
                <Typography
                    sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    mr: 10,
                    }}
                >
                    {manStock?.productId?.Kilograms}
                </Typography>
                </TableCell>

                <TableCell>
                <Typography
                    sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    mr: 10,
                    }}
                >
                    {manStock?.productId?.Type}
                </Typography>
                </TableCell>

                <TableCell>
                <Typography
                    sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    mr: 10,
                    }}
                >
                    {manStock?.Full}
                </Typography>
                </TableCell>

                <TableCell>
                <Typography
                    sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    mr: 10,
                    }}
                >
                    {manStock?.Empty}
                </Typography>
                </TableCell>

             
                
                <TableCell>
                <Typography  variant="h6"
                align='right'
                         sx={{
                            fontSize: "13px",
                            mr: 5,
                            }}
                >
                    {manStock?.Empty + manStock?.Full} 
                </Typography>
                </TableCell>
            </TableRow>
  ));

  const stationStockCount = Math.ceil(manasStock.length / stationStockPerPage);
      const changeStationStock = ({ selected }) => {
        setStationStockNumber(selected);
      };

  // ============================================= END PAGINATION ==================================================    

  return (
    <div>
      <Card variant="outlined">
          {managerStockLoading  ? (  <PuffLoader className={staManaStock.CircleLoader} color="#08C25E" size="340" />   ) : (
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
                          Stock
                        </Typography>
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
                        Size
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Type
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Full
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                        Empty
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6" align='right'>
                        Total Cylinder
                    </Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {displayStaManagerStock}
            </TableBody>
                    </Table>
                </Grid>
                </Box>
                <div className={staManaStock.stockPagination}>
                        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    pageCount={stationStockCount}
                    onPageChange={changeStationStock}
                    containerClassName={staManaStock.paginationButtons}
                    previousLinkClassName={staManaStock.previousButton}
                    nextLinkClassName={staManaStock.nextButton}
                    disabledClassName={staManaStock.pageDisabled}
                    activeClassName={staManaStock.activePage}
                    />
                </div>
            </CardContent>)}
        </Card>
    </div>
  )
}

export default StationManagerStock
