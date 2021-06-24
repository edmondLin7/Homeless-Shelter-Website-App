import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import LatestProductsFood from 'src/components/dashboard//LatestProductsFood';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

const Dashboard = () => {
  const[loginStatus, setLoginStatus] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/Login").then((response) => {
      if(response.data.loggedIn == true){
        setLoginStatus("Welcome " +response.data.user + ", you are logged in!")
      }
      })
  }, [])
  return (
  <>
    <h1>{loginStatus}</h1>
    <Helmet>
      <title>Dashboard | Shelter For Homeless</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
      <h1>Welcome to Shelter For Homeless</h1> 
      <h1> </h1>
        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
         <LatestProductsFood sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
};
export default Dashboard;
