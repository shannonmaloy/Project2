const fetch = require('node-fetch')
const yelp = require("yelp-fusion");

require("dotenv").config({ path: '../.env' });
require('express')

//Yelp API key
const apiKey = process.env.YELP_API_KEY
//validates API key with Yelp Client
const client = yelp.client(apiKey);

const searchRequest = {};

const getRestaurants = (req, res, next) => {
    
    let categories = [req.body.cuisine1,req.body.cuisine2,req.body.cuisine3].filter(Boolean).join(",")
    let price = [req.body.price1,req.body.price2,req.body.price3,req.body.price4].filter(Boolean).join(",")
    let distance = 0
    distance = parseInt(req.body.distance * 1609.34)
    for (let i = 1; i <= 3; i++) {
        if (req.body.cuisine + i) {
            categories = categories + req.body.cuisine[i]
        }
    }
    
    const searchRequest = {
    term: 'restaurant',
    categories: categories,
    location: req.body.address,
    transactions: '',
    price: price,
    radius: distance,
    limit: 50, }
   
    client.search(searchRequest).then(response => {
        let buildListOfRandomRestaurants = []
        restaurants = response.jsonBody.businesses
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * restaurants.length)
            console.log("Line 44" , restaurants[random])
           buildListOfRandomRestaurants.push(restaurants[random]) 
        }
        res.locals.restaurants = buildListOfRandomRestaurants
       
        next()
    }).catch((err) => {
          console.log(err)
          next(err)
        })
 
}

// const getRestaurants = (req, res, next) => {
//   fetch('https://api.yelp.com/v3/transactions/delivery/search?latitude=33.818610&longitude=-84.366230&term=restaurants', {
//     headers: {
//       Authorization: `Bearer ${process.env.YELP_API_KEY}`
//     }
//   }).then((res) => {
//     return res.json()
//   })
//     .then((json) => {
      

//       let random = Math.ceil(Math.random() * json.businesses.length)
//       console.log(json.businesses[random])
//       const firstResult = json.businesses[random];
//     //   const prettyJson = JSON.stringify(firstResult, null, 4);
//         res.locals.restaurant = firstResult
//         console.log("Line 58 Helper", res.locals.restaurant);
//         next()
//     }).catch((err) => {
//       console.log(err)
//       next(err)
//     })

// }


module.exports = { getRestaurants }