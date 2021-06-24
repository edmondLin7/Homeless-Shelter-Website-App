import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Avatar,
  CardContent,
  Card,
} from '@material-ui/core';

const user = {
  avatar: '/static/images/dashboard_resize.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};


const AboutUs = () => (
  <>
    <Helmet>
      <title>About Us</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      
      <Container maxWidth={true}>
      <h1 style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "background.default"
  }}></h1>
        <h1></h1>
        <img src={user.avatar}  sx={{
            height: 400,
            width: 400
          }}/>
      </Container>
    </Box>
  </>
);

export default AboutUs;
