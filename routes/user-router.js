const express = require('express');
const userRouter = express.Router();

const usersController = require('../controllers/users-controller');
const authHelpers = require('../services/auth/auth-helpers');

//Route to profile page
userRouter.get('/', authHelpers.loginRequired, usersController.index);
//Sends data to create a new user
userRouter.post('/', usersController.create);
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});

module.exports = userRouter;