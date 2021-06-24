const { Router } = require("express");
const express = require("express");
//const { O_APPEND } = require("node:constants");

//const express = require('express');
//const app = express();
const authController = require('../controllers/loginController');

const router = express.Router();

router.post('/Register', authController.register);

router.post('/app/account', authController.accountUpdate);

module.exports = router;
