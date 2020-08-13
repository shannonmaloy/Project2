const express = require("express");
const authRouter = express.Router();
// const userRouter = express.Router();
const authHelpers = require("../services/auth/auth-helpers");
const passport = require("../services/auth/local");
// const usersController = require("../controllers/users-controller");

// userRouter.get("/", authHelpers.loginRequired, usersController.index);
// userRouter.post("/", usersController.create);

// userRouter.get("/new", authHelpers.loginRedirect, (req, res) => {
//   res.render("auth/register");
// });

authRouter.get("/login", authHelpers.loginRedirect, (req, res) => {
  res.render("auth/login", {
    appName: "What's For Dinner",
    message: "ok",
    data: {
      user: req.user,
      params: req.params,
    }
  });
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
  res.redirect("/");
});

module.exports = authRouter;
