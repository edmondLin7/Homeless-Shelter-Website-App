const chai = require('chai');
const chaiHttp = require('chai-http');
const login = require('../controllers/loginController');
///Users/admin/Desktop/shelterHelp-master-3/controllers/loginController.js
const register = require('../controllers/loginController');
const should = chai.should();
const { stub, match } = require('sinon');
var expect = require('chai').expect;
chai.use(chaiHttp);
const request = require("supertest");
const express = require("express");
const assert = require("assert");
const httpMocks = require("node-mocks-http");
const { mockRequest, mockResponse } = require('mock-req-res');
const proxyquire = require('proxyquire')
const server = require("../app");
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
 
describe('Login', function() {
  // beforeEach(function(done) {
  //     var user = 'Cook'
  // });

  it('Connection of login page', function(done) {
      chai.request(server)
          .get('/Login')
          .end(function(err, res) {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body[0].should.have.property('name');
              res.body[0].should.have.property('password');
              done();
          });done();
  });

  
});

   it('check login function', function(done) {
            chai.request(server)
       .get('/Login')
           .end(function(err, res) {
               chai.request(server)
                   .put('/Login/' + res.body[0]._id)

                   
                   .send({
                       'name': 'Cook ',
                       'password': 'cookpassword'
                   })
                   // when we get a response from the endpoint
                   // in other words,
                   .end(function(error, response) {
                       // the res object should have a status of 200
                       response.should.have.status(200);
                       response.should.be.json;
                       response.body.should.be.a('object');
                       response.body.should.have.property('name');
                       response.body.should.have.property('password');
                       response.body.should.have.property('_id');
                       response.body.text.should.equal('Cook');
                       done();
                   });
           });done();
   });

  