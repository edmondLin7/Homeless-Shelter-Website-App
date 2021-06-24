const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const cors = require("cors")
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const{ promisify } = require('util');
const dotenv = require("dotenv");
const connection = require('./db/db-connection');

dotenv.config({path: './.env'});
const app = express();

// VY CODE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
// //VY CODE


const publicDirectory = path.join(__dirname, './public');
//console.log(__dirname); 
app.use(express.static(publicDirectory));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  key: "userId",
  secret: "pass",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 *24 * 24,
  },
})
);


app.use('/', require('./routes/loginRoute'));

app.post('/Login', async (req, res) => {
  console.log("I came through")
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    //console(email)
    if(!email || !password) {
      return res.send({
        message: 'Please provide an email and password'
      });
    } 
    console.log('****');
    connection.query("SELECT * FROM userdata WHERE email = '" + email + "'", async(error, results) => {
    console.log('****');
    console.log(results);
      if(error) {
        console.log('ereeeee');
        throw error;
      }
      else if(results.length < 1 || !(await bcrypt.compare(password, results[0].password))) {1
        res.send({
        message: 'The email or password is incorrect'
       })
      } else {
        console.log("hello")
        req.session.user = results;
        res.send(results)
      }
     
    });
    console.log('***^^*');
  } catch (error) {
    console.log(error);
  }

}) 

app.get("/App/Dashboard", (req, res) => {
    try {
      connection.query('SELECT * FROM userdata ORDER BY id DESC LIMIT 6', async(error, results) => {
      var names = [results[0].name,results[1].name,results[2].name,results[3].name,results[4].name,results[5].name]
      console.log(names[0])
      var id = [results[0].id,results[1].id,results[2].id,results[3].id,results[4].id,results[5].id]
      var time = [results[0].time,results[1].time,results[2].time,results[3].time,results[4].time,results[5].time]
      res.send({id: id, names: names, time: time}) 
        if(error) {
          throw error;
        }
      });
    } catch (error) {
      console.log(error);
    }
})

app.get("/Login", (req, res) => {
  
  if(req.session.user) {
    console.log(req.session.user[0].name);
    try {
      connection.query("SELECT * FROM userdata WHERE email = '" + [req.session.user[0].email]+ "'", async(error, results) => {
      console.log(results);
        if(error) {
          throw error;
        }
        res.send({loggedIn: true, user: results[0].name, phone: results[0].phone, country: results[0].country, state: results[0].state});
      });
    } catch (error) {
      console.log(error);
    }
  }
})



// Vy Code
// ROUTES FOR OUR API
// =============================================================================
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const shelterRouter = require('./routes/shelterRoute');
const {
  loadShelterController
} = require('./controllers/shelterController');
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());

var router = express.Router();        

app.use('/api/shelters', shelterRouter);
// router.route('/').get(loadShelterController);


// 404 handler
// 404 error

app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

// router.route('/shelters/:id').get(loadEventControllerById);
// Vy Code

app.listen(5000,() => {
   console.log("Server started on Port 5000");
})


module.exports = app;