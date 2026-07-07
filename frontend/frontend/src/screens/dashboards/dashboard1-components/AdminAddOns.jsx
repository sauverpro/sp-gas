import React from 'react'
import add from "./AdminAddOns.module.css";
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
import { useEffect } from "react";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function AdminAddOns() {

 // ============================    Loading ===================================
  const navigate = useNavigate();
  const [addonsLoading, setAddonsLoading] = useState(false);

 // ============================    Loading ===================================

// =============================    Fetch  Addons ====================================
 
  const [addons, setAddons] = useState([]);
  const fetchAddons = () => {
    setAddonsLoading(true);
    let token = localStorage.getItem("token");

    setAddonsLoading(true);
    axios({
      method: "GET",
      url:"https://sp-gas-api.onrender.com/api/v1/addons/",
      headers:{
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json",   
       },
    }).then((Response) =>{
      setAddonsLoading(false);
      console.log(Response);
      setAddons(Response.data.data);

    }).catch((error) =>{
      console.log(error);
      setAddonsLoading(false);
    })
  }
  useEffect(() =>{
    fetchAddons();
  },[]);
   
// =============================   End Fetch Addons ====================================

// =============================   PAGINATION       ==================================== 
  
   const [addOnsNumber, setAddOnsNumber] = useState(0);
   const addOnsPerPage = 5;
   const addOnsVisited = addOnsNumber * addOnsPerPage;
   const displayAddOns = addons.slice(addOnsVisited , addOnsVisited + addOnsPerPage).map((stock)=>(    
    <TableRow >
    <TableCell>
    <Typography
        sx={{
        fontSize: "15px",
        fontWeight: "500",
        }}
    >
        {stock.Name}
    </Typography>
    </TableCell>
    <TableCell>
    <Typography variant="h6"> {(stock.Price).toLocaleString()} Rwfs</Typography>
    </TableCell>
    <TableCell align='right'>
  <Box  
          sx={{
            mt: {
                lg: 0,
                xs: 2,
            },
            }}> 
                     <Button
                     onClick={() => navigate(`/dashboard/adminaddonsdetails/${stock._id}`)}
                    variant="contained"
                    color="success"
                    sx={{
                        mr: 0,
                        mb: 1,
                    }}
                      >
                   <FaEye className={add.eye}/> 
                       View
                </Button> 
                  
             </Box>
  </TableCell>
    </TableRow>  
   ));
   const addOnsCount = Math.ceil(addons.length / addOnsPerPage);
   const changeAddOns = ({ selected }) => {
     setAddOnsNumber(selected);
   };
  // ==============================END pagination =======================================  

  return (
    <div>
    <Card variant="outlined">     
   {addonsLoading ? (  <PuffLoader className={add.CircleLoader} color="#08C25E" size="340" />   ) : ( <CardContent>
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
                AddOns Stock 
                </Typography>           
                </Box>
                <Box  sx={{
                marginLeft: "auto",
                mt: {
                    lg: 0,
                    xs: 2,
                },
                }}> 
                <Link to="/dashboard/adminaddaddons">
                    <Button
                    variant="contained"
                    color="success"
                    sx={{
                        mr: 1,
                        mb: 1,
                    }}
                    >
                    +Add AddOns Stock
                    </Button>
                    </Link>              
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
            Name
            </Typography>
        </TableCell>
        <TableCell>
            <Typography color="textSecondary" variant="h6">
            Price
            </Typography>
        </TableCell>
        
        <TableCell align='right' >
            <Typography color="textSecondary" variant="h6">
            Action
            </Typography>
        </TableCell>
        
        </TableRow>
    </TableHead>
    <TableBody>
        {displayAddOns}
    </TableBody>
            </Table>
        </Grid>
        </Box>
        <div className={add.downn}>
                <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={addOnsCount}
        onPageChange={changeAddOns}
        containerClassName={add.paginationButtons}
        previousLinkClassName={add.previousButton}
        nextLinkClassName={add.nextButton}
        disabledClassName={add.pageDisabled}
        activeClassName={add.activePage}
      />
      </div>
    </CardContent>)}    
</Card> 
</div>
  )
}

export default AdminAddOns
