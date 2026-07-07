import stations from "./AdminStations.module.css" ;
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  import PuffLoader from "react-spinners/PuffLoader";

  const AdminStations = () => {

    const navigate = useNavigate();
    const [stationLoading , setStationLoading] = useState(false);

    // =================== FETCH Station ===============================================

    const [stationu , setStationu] = useState([]);
    let token = localStorage.getItem("token");
     console.log(token);
    const fetchStations = () => {
        setStationLoading(true);
         axios({
            method: "GET",
            url: "https://sp-gas-api.onrender.com/api/v1/stations",
            headers : {
                Authorization: `bearer ${token}`,
                "Content-Type" : "application/json; charset=utf-8", 
            },
         })
         .then((Response)=>{
            setStationLoading(false);
            setStationu(Response.data.data);
            console.log(Response);
         })
         .catch((error)=>{
            setStationLoading(false);
            console.log(error);
         })
    }

    useEffect(()=>{
        fetchStations();
    },[]);

     // =================== END FETCH Station ==========================================


      // =================== Pagination =============================================================================

      const [stationsNumber, setStationsNumber] = useState(0);
      const stationsPerPage = 5;
      const stationsVisited = stationsNumber * stationsPerPage;
      const dispalyStations = stationu.slice(stationsVisited , stationsVisited + stationsPerPage).map((sitation) => (
          <TableRow >
              <TableCell>
              <Typography
                  sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                  }}
              >
                  {sitation.StationName}
              </Typography>
              </TableCell>
              <TableCell>
              <Typography  
                      sx={{
                      fontSize: "13px",
                      }}
                  >
                      {sitation.managerId.FullNames}
                  </Typography>
              </TableCell>
              <TableCell>
              <Typography  variant="h6">
                  {sitation.Location}
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
                            onClick={() => navigate(`/dashboard/adminstationdetails/${sitation._id}`)}
                            variant="contained"
                            color="success"
                            sx={{
                                mr: -9,
                                mb: 1,
                            }}
                            >
                               <FaEye className={stations.eye}/> 
                           View
                            </Button>
                         
                          
                         </Box>
              </TableCell>
          </TableRow>
          ));
          const stationsCount = Math.ceil(stationu.length / stationsPerPage);
          const changeStations = ({ selected }) => {
            setStationsNumber(selected);
          };
       // =================== Pagination End ===========================================================================
    return ( 
        <Card variant="outlined">
         
            {stationLoading ? ( <PuffLoader className={stations.CircleLoader} color="#08C25E" size="340" /> ) : (
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
                        Stations
                        </Typography>
                        </Box>

                        <Box  sx={{
                        marginLeft: "auto",
                        mt: {
                            lg: 0,
                            xs: 2,
                        },
                        }}> 
                        <Link to="/dashboard/adminaddstations">
                             <Button
                            variant="contained"
                            color="success"
                            sx={{
                                mr: 1,
                                mb: 1,
                            }}
                            >
                            +Add Station
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
                    Station Name
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                    Manager
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="h6">
                    Location
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
                {dispalyStations}
            </TableBody>
                    </Table>
                </Grid>
                </Box>
                <div className={stations.downn}>
                        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={stationsCount}
                onPageChange={changeStations}
                containerClassName={stations.paginationButtons}
                previousLinkClassName={stations.previousButton}
                nextLinkClassName={stations.nextButton}
                disabledClassName={stations.pageDisabled}
                activeClassName={stations.activePage}
              />
              </div>
            </CardContent>
            )}
           
        </Card>
     );
}
 
export default AdminStations;