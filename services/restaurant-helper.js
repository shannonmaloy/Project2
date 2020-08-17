const fetch = require("node-fetch");
const yelp = require("yelp-fusion");

require("dotenv").config({ path: "../.env" });
require("express");

//Yelp API key
const apiKey = process.env.YELP_API_KEY;
//validates API key with Yelp Client
const client = yelp.client(apiKey);

let searchRequest = {};

const restaurantHelper = {
  search(req, res, next) {
        let categories = [req.body.cuisine1, req.body.cuisine2, req.body.cuisine3]
        .filter(Boolean)
        .join(",");
        let price = [
        req.body.price1,
        req.body.price2,
        req.body.price3,
        req.body.price4,
        ]
        .filter(Boolean)
        .join(",");
        let distance = 0;
        distance = parseInt(req.body.distance * 1609.34);
        for (let i = 1; i <= 3; i++) {
        if (req.body.cuisine + i) {
            categories = categories + req.body.cuisine[i];
        }
        }

        let searchRequest = {
        term: "restaurant",
        categories: categories,
        location: req.body.address,
        transactions: "",
        price: price,
        radius: distance,
        limit: 50,
        };

        client
        .search(searchRequest)
        .then((response) => {
            let buildListOfRandomRestaurants = [];
            restaurants = response.jsonBody.businesses;
            for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * restaurants.length);
            console.log("Line 44", restaurants[random]);
            buildListOfRandomRestaurants.push(restaurants[random]);
            }
            res.locals.restaurants = buildListOfRandomRestaurants;
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
        },

    detail(req, res, next) {  
        searchRequest = req.params[0]
        client
        .business(searchRequest)
            .then((response) => {
                res.locals.restaurantDetail = response.jsonBody
                next()
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
        
    },

    reviews(req, res, next) {
        searchRequest = req.params[0]
        client.reviews(req.params[0]).then(response => {
            res.locals.restaurantReviews = response.jsonBody.reviews
            console.log(res.locals.restaurantReviews)
            next()
        }).catch((err) => {
            console.log(err);
            next(err);
        });
    }
};

module.exports = { restaurantHelper };
