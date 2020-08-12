const express = require("express");
const userRouter = express.Router();
const passport = require("../services/auth/local");
// const usersController = require("../controllers/users-controller");
const authHelpers = require("../services/auth/auth-helpers");
const authRouter = express.Router();

// userRouter.get("/", authHelpers.loginRequired, usersController.index);
// userRouter.post("/", usersController.create);

// userRouter.get("/new", authHelpers.loginRedirect, (req, res) => {
//   res.render("auth/register");
// });

authRouter.get("/login", authHelpers.loginRedirect, (req, res) => {
  res.render("auth/login");
});

//Passport authenticates the user for us based on the 'local' strategy in services/auth/local.js
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("back");
});

module.exports = authRouter;
