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
    },

    create(req, res, next) {
        console.log("rest controller",req.body)
        console.log("LINE 22:" ,req.user.id)
        new Restaurant({
            name: req.body.name,
            yelpAlias: req.body.yelpAlias,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            notes: req.body.notes,
            user_id: req.user.id,
        })
            .save()
            .then(() => {
            res.redirect('/user/profile')
            })
        .catch(next)
    }
}

module.exports = restaurantsController;
