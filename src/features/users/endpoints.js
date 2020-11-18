const express = require('express');
const { loginUser } = require('./service');
const { validateBody, validate } = require('./userValidator');

userRouter = express.Router();

userRouter.post('/', validateBody.signIn, validate, loginUser);

module.exports = {userRouter};