const Restaurant = require("../models/Restaurant");
const searchRest = require('../services/restaurant-helper');
const restaurantRouter = require("../routes/restaurant-router");



const restaurantsController = {
    index(req, res, next) {
        console.log("Controller Line 9", res.json)
        res.json("restaurant/index", {
            message: "Put a user profile page on this route",
            success: true,
            data: {
                user: req.user,
                params: req.params,
            },
        });
    }
}


// searchRest.getRestaurants()
console.log("coming from here")





module.exports = restaurantsController;
