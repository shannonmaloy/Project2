const express = require("express");
const restaurantRouter = express.Router();
const authHelpers = require("../services/auth/auth-helpers");

const restaurantController = require("../controllers/restaurants-controller");

restaurantRouter.get("/", authHelpers.loginRedirect, (req, res) => {
  res.render("restaurant/index");
});

module.exports = restaurantRouter;
