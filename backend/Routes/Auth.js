const express = require('express');
const authController = require('../controller/AuthController');
const { check, body } = require('express-validator');
const isAuth= require('../util/checkAuth');
const Router = express.Router();

Router.post('/signup',
[   check('email').isEmail([{ domain_specific_validation: false }]).withMessage('Invalid Email !'),
    body('password').isAlphanumeric().isLength({ min: 8 }).withMessage('Password must be of 8 Characters long and Alphanumeric!'),
]
,authController.postSignup)

Router.post('/login',authController.postLogin)

module.exports = Router;