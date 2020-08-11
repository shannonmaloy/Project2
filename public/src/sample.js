

  

'use strict';

const yelp = require('yelp-fusion');
const { REPL_MODE_SLOPPY } = require('repl');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'PxN2W1yNYTin9gjgWs8aow0KsbsPKf6QRAt-AY6ZbIIMfyVAEzkZpA5FAd11tMgzAlnpkaehKKLPiGVUtneyfUZnB4taDGz4vjaaiGmXceOIB81Wyi1-4xJXILAtX3Yx';


const searchRequest = {
    term: 'restaurant',
    categories: 'mexican',
    location: '30309',
    transactions: 'delivery',
    price: "1,2,3",
  limit: 3,
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
    let rests = response.jsonBody.businesses
    for (let i = 0; i < rests.length; i++) {
        console.log(rests[i].name)
    }
        
//     let random = Math.ceil(Math.random()*response.jsonBody.businesses.length)
//   const firstResult = response.jsonBody.businesses[random];
//   const prettyJson = JSON.stringify(firstResult, null, 4);
//   console.log(prettyJson);
}).catch(e => {
  console.log(e);
});