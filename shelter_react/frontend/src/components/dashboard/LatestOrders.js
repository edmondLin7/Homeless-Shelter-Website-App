import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React, {useState, useEffect} from "react";
import Axios from 'axios';


var orders = [
  {
    id: uuid(),
    ref: '0000001',
    amount: 30.5,
    customer: {
      name: 'Vy Duong'
    },
    createdAt: 1614900000000,
    status: 'online'
  },
  {
    id: uuid(),
    ref: '0000002',
    amount: 25.1,
    customer: {
      name: 'Edmond Lin'
    },
    createdAt: 1614900000000,
    status: 'offline'
  },
  {
    id: uuid(),
    ref: '0000003',
    amount: 10.99,
    customer: {
      name: 'My Nguyen'
    },
    createdAt: 1614792900000,
    status: 'online'
  },
  {
    id: uuid(),
    ref: '0000003',
    amount: 10.99,
    customer: {
      name: 'Vi Nguyen'
    },
    createdAt: 1604636422000,
    status: 'online'
  },
  {
    id: uuid(),
    ref: '0000003',
    amount: 10.99,
    customer: {
      name: 'Sandy Tong'
    },
    createdAt: 1603836400000,
    status: 'offline'
  },
  {
    id: uuid(),
    ref: '0000003',
    amount: 10.99,
    customer: {
      name: 'Simanta Joe'
    },
    createdAt: 1602836400000,
    status: 'online'
  }
];


const LatestOrders = (props) => {
  //var id = [];
  //var name = [];
  //var time = [];
  const[stateStatus, setStateStatus] = useState("hllo");
  useEffect(() => {
    Axios.get("http://localhost:5000/App/Dashboard").then((response) => {
        var id = response.data.id
        orders[0].ref = id[0]
        setStateStatus(id.length)
        //console.log(id[0])
        var names = response.data.names
        orders[0].customer.name = names[0]
        var time = response.data.time
        orders[0].createdAt = time[0]
        setStateStatus(orders[0].createdAt)
        //orders[0].ref = id[0]
        //orders[0].customer.name = names[0]
        //orders[0].createdAt = time[0]
        //setStateStatus(orders)
        for (var i = 0; i < id.length; i++) {
          orders[i].ref = id[i]
          setStateStatus(orders[i].ref)
          orders[i].customer.name = names[i]       
          setStateStatus(orders[i].customer.name)
          orders[i].createdAt = time[i]
          setStateStatus(orders[i].createdAt)
        }       
      })
  }, [])
  return (
  <Card {...props}>r
    <CardHeader title="Latest Register User" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                User ID Ref
              </TableCell>
              <TableCell>
                UserName
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Register date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell>
                  {order.customer.name}
                </TableCell>
                <TableCell>
                  {order.createdAt}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={order.status}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
  )
};

export default LatestOrders;
