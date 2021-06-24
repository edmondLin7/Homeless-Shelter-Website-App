//import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Container,
  Link,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { SettingsApplicationsTwoTone } from "@material-ui/icons";

const states = [
  { 'label':'Not Applicable', 'value': 'None' },
  { 'label':'Alabama', 'value': 'AL' },
  { 'label':'Alaska', 'value': 'AK'},
  { 'label':'American Samoa', 'value': 'AS'},
  { 'label':'Arizona', 'value': 'AZ'},
  { 'label':'Arkansas', 'value': 'AR'},
  { 'label':'California', 'value': 'CA'},
  { 'label':'Colorado', 'value': 'CO'},
  { 'label':'Connecticut', 'value': 'CT'},
  { 'label':'Delaware', 'value': 'DE'},
  { 'label':'District of Columbia', 'value': 'DC'},
  { 'label':'States of Micronesia', 'value': 'FM'},
  { 'label':'Florida', 'value': 'FL'},
  { 'label':'Georgia', 'value': 'GA'},
  { 'label':'Guam', 'value': 'GU'},
  { 'label':'Hawaii', 'value': 'HI'},
  { 'label':'Idaho', 'value': 'ID'},
  { 'label':'Illinois', 'value': 'IL'},
  { 'label':'Indiana', 'value': 'IN'},
  { 'label':'Iowa', 'value': 'IA'},
  { 'label':'Kansas', 'value': 'KS'},
  { 'label':'Kentucky', 'value': 'KY'},
  { 'label':'Louisiana', 'value': 'LA'},
  { 'label':'Maine', 'value': 'ME'},
  { 'label':'Marshall Islands', 'value': 'MH'},
  { 'label':'Maryland', 'value': 'MD'},
  { 'label':'Massachusetts', 'value': 'MA'},
  { 'label':'Michigan', 'value': 'MI'},
  { 'label':'Minnesota', 'value': 'MN'},
  { 'label':'Mississippi', 'value': 'MS'},
  { 'label':'Missouri', 'value': 'MO'},
  { 'label':'Montana', 'value': 'MT'},
  { 'label':'Nebraska', 'value': 'NE'},
  { 'label':'Nevada', 'value': 'NV'},
  { 'label':'New Hampshire', 'value': 'NH'},
  { 'label':'New Jersey', 'value': 'NJ'},
  { 'label':'New Mexico', 'value': 'NM'},
  { 'label':'New York', 'value': 'NY'},
  { 'label':'North Carolina', 'value': 'NC'},
  { 'label':'North Dakota', 'value': 'ND'},
  { 'label':'Northern Mariana Islands', 'value': 'MP'},
  { 'label':'Ohio', 'value': 'OH'},
  { 'label':'Oklahoma', 'value': 'OK'},
  { 'label':'Oregan', 'value': 'OR'},
  { 'label':'Palau', 'value': 'PW'},
  { 'label':'Pennsilvania', 'value': 'PA'},
  { 'label':'Puerto Rico', 'value': 'PR'},
  { 'label':'Rhode Island', 'value': 'RI'},
  { 'label':'South Carolina', 'value': 'SC'},
  { 'label':'South Dakota', 'value': 'SD'},
  { 'label':'Tennessee', 'value': 'TN'},
  { 'label':'Texas', 'value': 'TX'},
  { 'label':'Utah', 'value': 'UT'},
  { 'label':'Vermont', 'value': 'VT'},
  { 'label':'Virgin Islands', 'value': 'VI'},
  { 'label':'Virginia', 'value': 'VA'},
  { 'label':'Washington', 'value': 'WA'},
  { 'label':'West Virginia', 'value': 'WV'},
  { 'label':'Wisconsin', 'value': 'WI'},
  { 'label':'Wyoming', 'value': 'WY'}
];

const AccountProfileDetails = (props) => {
  Axios.defaults.withCredentials = true;
  const [currEmail, setCurrEmail] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");  const [state, setState] = useState("");
  const[status, setStatus] = useState("");


const handleCurrEmail = e => {
  console.log("Typed = ${e.target.value}")
  setCurrEmail(e.target.value)
};
  
const handleNameChange = e => {
  console.log("Typed = ${e.target.value}")
  setFullName(e.target.value)
};
const handleEmailChange = e => {
  console.log("Typed = ${e.target.value}")
  setEmail(e.target.value)
};
const handlePhone = e => {
  console.log("Typed = ${e.target.value}")
  setPhone(e.target.value)
};
const handleCountry = e => {
  console.log("Typed = ${e.target.value}")
  setCountry(e.target.value)
};
const handleState = e => {
  console.log("Typed = ${e.target.value}")
  setState(e.target.value)
};

const navigate = useNavigate();

var submitAccount = () => {
  navigate('/app/dashboard', { replace: true });
}
var submitAcc = () => { 
  Axios.post       ("http://localhost:5000/app/account", {curr: currEmail, name: fullname, email:email, phone:phone, country: country, state:state,
  }).then((response) => {  
     window.location.reload(false);
    // navigate('/app/account', { replace: true })
 });
 };

useEffect(() => {
  Axios.get("http://localhost:5000/Login").then((response) => {
    if(response.data.loggedIn == true){
      //setLoginStatus(response.data.user[0].name)
      submitAcc = () => { Axios.post       ("http://localhost:5000/app/account", { curr: currEmail, name: fullname, email:email, phone:phone, country: country, state:state,
    }).then((response) => {  
      if(response.data.message) {
        setStatus(response.data.message)
    }
      else {
        setStatus(response.data.message)
      }
    });
  };
  }
    })
}, [])



  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              currEmail: '',
              email: '',
              name: '',
              phone: '',
              state: '',
              country: '',
              policy: false
            }}
            onSubmit={
              submitAcc
            }
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
            <form onSubmit={handleSubmit}>
              <Card>
              <CardHeader
              subheader="The information can be edited"
              title="Profile"
              />
              <Divider />
              <CardContent>
              <Grid
                container
                spacing={3}
              >
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                error={Boolean(touched.currEmail && errors.currEmail)}
                fullWidth
                helperText={touched.currEmail && errors.currEmail}
                fullWidth
                onBlur={handleBlur}
                helperText="Please provide your current email"
                label="Current Email"
                name="firstName"
                onChange={handleCurrEmail}
                required
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                fullWidth
                onBlur={handleBlur}
                helperText="Please specify the first name"
                label="Change Full Name To"
                name="firstName"
                onChange={handleNameChange}
                required
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                >
               <TextField
                error={Boolean(touched.phone && errors.phone)}
                fullWidth
                helperText={touched.phone && errors.phone}
                onBlur={handleBlur}
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handlePhone}
                type="number"
                variant="outlined"
                />
                </Grid>
                <Grid
                 item
                md={6}
                 xs={12}
               >
                <TextField
                error={Boolean(touched.country && errors.country)}
                fullWidth
                helperText={touched.country && errors.country}
                fullWidth
                onBlur={handleBlur}
                label="Country"
                name="country"
                onChange={handleCountry}
                required
                variant="outlined"
                />
                </Grid>
                <Grid
                  item
                  md={6}
                 xs={12}
                >
                <TextField
                fullWidth
                label="Select State if USA"
                name="state"
                onChange={handleState}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                  ))}
                </TextField>
                </Grid>
                </Grid>
                </CardContent>
                <Divider />
               <Box
                sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
                }}
                >
                <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
               >
                Save details
              </Button>
              </Box>
              </Card>
            </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};


export default AccountProfileDetails;
