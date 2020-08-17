const Restaurant = require("../models/Restaurant");
const { show } = require("./users-controller");
// const searchRest = require('../services/restaurant-helper');
// const restaurantRouter = require("../routes/restaurant-router");

const restaurantsController = {
    index(req, res, next) {
        res.json("restaurant/index", {
            message: "Ok",
            success: true,
            data: {
                user: req.user,
                params: req.params,
            },
        });
    },

    create(req, res, next) {
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
    },

    
}

module.exports = restaurantsController;
