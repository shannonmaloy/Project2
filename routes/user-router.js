const express = require("express");
const userRouter = express.Router();

const usersController = require("../controllers/users-controller");
const authHelpers = require("../services/auth/auth-helpers");

//Route to profile page
userRouter.get("/", authHelpers.loginRequired, usersController.index);
//Sends data to create a new user
userRouter.post("/", usersController.create);

userRouter.get("/index", authHelpers.loginRequired, usersController.index)

userRouter.get("/register", authHelpers.loginRedirect, (req, res) => {
  res.render("auth/register", {
    appName: "What's For Dinner",
    message: "Put a user profile page on this route",
    success: false,
    data: {
      user: req.user,
      params: req.params,
    }
  })
}),

userRouter.get("/profile", authHelpers.loginRequired, usersController.index, (req, res) => {
  res.render("/user/profile", {
    appName: "What's For Dinner",
    message: "Put a user profile page on this route",
    success: true,
    data: {
      user: req.user,
      params: req.params,
    }
  })
});

module.exports = userRouter;
