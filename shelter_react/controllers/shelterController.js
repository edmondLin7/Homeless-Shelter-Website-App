const ShelterModel = require('../models/shelter.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { lookup } = require('geoip-lite');
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class ShelterController {
    getAllShelters = async (req, res, next) => {
        var shelterList = await ShelterModel.find();
        if (!shelterList.length) {
            throw new HttpException(404, 'Users not found');
        }
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var fullUrl = req.protocol + '://' + req.get('host');
        fullUrl = fullUrl.replace('5000', '3000')
        shelterList.forEach(function(shelter){
            shelter.imageURL = fullUrl + shelter.imageURL 
        })

        res.send(shelterList);
    };

    getShelterById = async (req, res, next) => {
        const shelter = await ShelterModel.findOne({ id: req.params.id });
        if (!shelter) {
            throw new HttpException(404, 'User not found');
        }

        res.send(shelter);
    };

    // getUserByuserName = async (req, res, next) => {
    //     const user = await UserModel.findOne({ username: req.params.username });
    //     if (!user) {
    //         throw new HttpException(404, 'User not found');
    //     }

    //     const { password, ...userWithoutPassword } = user;

    //     res.send(userWithoutPassword);
    // };

    // getCurrentUser = async (req, res, next) => {
    //     const { password, ...userWithoutPassword } = req.currentUser;

    //     res.send(userWithoutPassword);
    // };

    // createUser = async (req, res, next) => {
    //     this.checkValidation(req);

    //     await this.hashPassword(req);

    //     const result = await UserModel.create(req.body);

    //     if (!result) {
    //         throw new HttpException(500, 'Something went wrong');
    //     }

    //     res.status(201).send('User was created!');
    // };

    // updateUser = async (req, res, next) => {
    //     this.checkValidation(req);

    //     await this.hashPassword(req);

    //     const { confirm_password, ...restOfUpdates } = req.body;

    //     // do the update query and get the result
    //     // it can be partial edit
    //     const result = await UserModel.update(restOfUpdates, req.params.id);

    //     if (!result) {
    //         throw new HttpException(404, 'Something went wrong');
    //     }

    //     const { affectedRows, changedRows, info } = result;

    //     const message = !affectedRows ? 'User not found' :
    //         affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

    //     res.send({ message, info });
    // };

    // deleteUser = async (req, res, next) => {
    //     const result = await UserModel.delete(req.params.id);
    //     if (!result) {
    //         throw new HttpException(404, 'User not found');
    //     }
    //     res.send('User has been deleted');
    // };

    // userLogin = async (req, res, next) => {
    //     this.checkValidation(req);

    //     const { email, password: pass } = req.body;

    //     const user = await UserModel.findOne({ email });

    //     if (!user) {
    //         throw new HttpException(401, 'Unable to login!');
    //     }

    //     const isMatch = await bcrypt.compare(pass, user.password);

    //     if (!isMatch) {
    //         throw new HttpException(401, 'Incorrect password!');
    //     }

    //     // user matched!
    //     const secretKey = process.env.SECRET_JWT || "";
    //     const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
    //         expiresIn: '24h'
    //     });

    //     const { password, ...userWithoutPassword } = user;

    //     res.send({ ...userWithoutPassword, token });
    // };

    // checkValidation = (req) => {
    //     const errors = validationResult(req)
    //     if (!errors.isEmpty()) {
    //         throw new HttpException(400, 'Validation faild', errors);
    //     }
    // }

    // // hash password if it exists
    // hashPassword = async (req) => {
    //     if (req.body.password) {
    //         req.body.password = await bcrypt.hash(req.body.password, 8);
    //     }
    // }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ShelterController;




