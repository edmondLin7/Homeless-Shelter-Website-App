const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const{ promisify } = require('util');
const dotenv = require("dotenv");

const connection = require('../db/db-connection');

exports.login = async (req, res) => {
  console.log("I came through");
  try {
    const { email, password } = req.body;
    //console(email)
    if(!email || !password) {
      return res.send({
        message: 'Please provide an email and password'
      });
    } 

    connection.query('SELECT * FROM user WHERE email = ?', [email], async(error, results) => {
     // console.log(results);
      if(error) {
        throw error;
      }
      if (results.length < 1 || !(await bcrypt.compare(password, results[0].password))) {
       res.send({
        message: 'The email or password is incorrect'
       })
      }
      else {
        req.session.user = results;
        res.send({loggedIn: true, user:req.session.user});
      }
    });
  } catch (error) {
    console.log(error);
  }
}

exports.register = (req, res) => {
  console.log(req.body);

  const{ name, email, password, passwordconfirm } = req.body;
  
  connection.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) => {
    if(error) {
      console.log(error);
    }
    if(results.length > 0) {
      res.send({
       message:
     'Email is already in use, please try another email'
     });
    } else if ( password !== passwordconfirm) {
      res.send({
        message: 'Passwords do not match, try again'
     });
    }
    else {
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword)
      connection.query('INSERT INTO user SET ?', { name: name, email: email, password: hashedPassword}, (error, results) => {
        if(error){
          console.log(error);
        } else {
          console.log(results);
          // res.send({
          //   message:  'Successfully Registered, you can now Login In!'
          // });
       }
      });
  }
});
}

exports.accountUpdate = (req, res) => {
  console.log(req.body);
  try {
    const{curr, name, email, phone, country, state } = req.body;
    connection.query('SELECT id FROM user WHERE email = ?', [curr], async(error, results) => {
     // console.log(results);
      if(error) {
        throw error;
      }
      if(results.length > 0) {
        try{
        let idval = await results;
        console.log(idval);
        connection.query('UPDATE user SET name = ?,phone = ?, country = ?, state = ? WHERE id = ?', [name, phone, country, state, results[0].id], async(error, results) => {
           if(error) {
             throw error;
           } else {
            console.log(results);
            res.send({
              message:  'Successfully Registered, you can now Login In!'
            });
         }
        });
        }catch (error) {
          console.log(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}