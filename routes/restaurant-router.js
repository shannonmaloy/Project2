const express = require("express");
const restaurantRouter = express.Router();
const authHelpers = require("../services/auth/auth-helpers");


const restaurantsController = require("../controllers/restaurants-controller");
const {getRestaurants} = require("../services/restaurant-helper")
// restaurantRouter.get("/", restaurantsController.index)


restaurantRouter.post("/", getRestaurants, (req, res) => {
  res.render("restaurant/index", {
    message: "Yelp API Results",
    success: true,
    data: {
      restaurants: res.locals.restaurants,
      user: req.user,
    },
  })
})
  

module.exports = restaurantRouter;
