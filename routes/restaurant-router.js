const express = require("express");
const restaurantRouter = express.Router();
const authHelpers = require("../services/auth/auth-helpers");

const restaurantsController = require("../controllers/restaurants-controller");
const { restaurantHelper } = require("../services/restaurant-helper");


restaurantRouter.post("/", restaurantHelper.search, (req, res) => {
  res.render("restaurant/index", {
    message: "Ok",
    success: true,
    data: {
      restaurants: res.locals.restaurants,
      user: req.user,
    },
  });
});

restaurantRouter.post("/add", authHelpers.loginRequired,restaurantsController.create, (req, res) => {
    
  res.render("restaurant/detail", {
    message: "Yelp API Results",
    success: true,
    data: {
      restaurantDetail: res.locals.restaurantDetail,
      restaurantReviews: res.locals.restaurantReviews,
      user: req.user,
    },
  });
}
);

restaurantRouter.get("/add/*", restaurantHelper.detail, (req, res) => {
  
  res.render('restaurant/add', {
    message: "Ok",
    success: true,
    data: {
      restaurantDetail: res.locals.restaurantDetail,
      user: req.user,
    },
  })
})

restaurantRouter.get("/detail/*", restaurantHelper.detail, restaurantHelper.reviews, (req, res) => {
    
    res.render("restaurant/detail", {
      message: "Ok",
      success: true,
      data: {
        restaurantDetail: res.locals.restaurantDetail,
        restaurantReviews: res.locals.restaurantReviews,
        user: req.user,
      },
    });
  }
);

module.exports = restaurantRouter;
