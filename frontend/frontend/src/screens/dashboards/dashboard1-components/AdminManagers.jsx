import React from 'react';
import adminmanager from "./AdminManagers.module.css";
import admTariff from './AdminTariff.module.css';
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
  import PuffLoader from "react-spinners/PuffLoader";
  import { useNavigate } from 'react-router-dom';


const AdminManagers = () => {

    const navigate = useNavigate();
   
    const [managerLoading , setManagerLoading] = useState(false);

      // ======================================= MANAGERS ================================================

      const [managerrs, setManagerrs] = useState([]);
      
      const fetchManagers = () =>{
          let token = localStorage.getItem("token");
          setManagerLoading(true);
          axios({
            method : "GET",
            url : "https://sp-gas-api.onrender.com/api/v1/auth/managers",
            headers : {
              Authorization : `Bearer ${token}`,
              "Content-Type" : "application/json; charset=utf-8", 
            }
          })
          .then((Response) =>{
            setManagerLoading(false);
            console.log(Response);
            setManagerrs(Response.data.data);
          })
          .catch((error)=>{
            setManagerLoading(false);
            console.log(error);
          })
      };
      useEffect(()=>{
        fetchManagers();
      },[]);

       // ======================================= MANAGERS ================================================

      const [managersNumber, setManagersNumber] = useState(0);
      const managersPerPage = 5;
      const managersVisited = managersNumber * managersPerPage;
      const dispalyManagers = managerrs.slice(managersVisited , managersVisited + managersPerPage).map((manage) => (
          <TableRow >
              <TableCell>
              <Typography
                  sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                  }}
              >
                  {manage.FullNames}
              </Typography>
              </TableCell>
              <TableCell>
              <Typography   
                      sx={{
                      fontSize: "13px",
                      }}
                  >
                      {manage.PhoneNumber}
                  </Typography>
              </TableCell>
              <TableCell>
              <Typography  variant="h6">
                  {manage.Email}
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
                            onClick={() => navigate(`/dashboard/adminmanagerdetails/${manage._id}`)}
                            variant="contained"
                            color="success"
                            sx={{
                                mr: -9,
                                mb: 1,
                            }}
                            >
                               <FaEye className={adminmanager.eye}/> 
                           View
                            </Button>
                        
                          
                         </Box>
              </TableCell>
          </TableRow>
          ));
          const managersCount = Math.ceil(managerrs.length / managersPerPage);
          const changeManagers = ({ selected }) => {
            setManagersNumber(selected);
          };
    

  return (
    <Card variant="outlined">
  {managerLoading ? ( <PuffLoader className={admTariff.CircleLoader} color="#08C25E" size="340" />  ) : (<CardContent>
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
                Station Managers
                </Typography>
                </Box>

                <Box  sx={{
                marginLeft: "auto",
                mt: {
                    lg: 0,
                    xs: 2,
                },
                }}> 
                <Link to="/dashboard/adminaddmanager">
                     <Button
                    variant="contained"
                    color="success"
                    sx={{
                        mr: 1,
                        mb: 1,
                    }}
                    >
                    +Add Station Manager
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
           Name
            </Typography>
        </TableCell>
        <TableCell>
            <Typography color="textSecondary" variant="h6">
            Phone Number
            </Typography>
        </TableCell>
        <TableCell>
            <Typography color="textSecondary" variant="h6">
            Email
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
        {dispalyManagers}
    </TableBody>
            </Table>
        </Grid>
        </Box>
            <div className={adminmanager.downn}>
                <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={managersCount}
        onPageChange={changeManagers}
        containerClassName={adminmanager.paginationButtons}
        previousLinkClassName={adminmanager.previousButton}
        nextLinkClassName={adminmanager.nextButton}
        disabledClassName={adminmanager.pageDisabled}
        activeClassName={adminmanager.activePage}
      />
      </div>
    </CardContent>)}
    
    </Card>
  )
}

export default AdminManagers
