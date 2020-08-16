const db = require('../db/config')

class Restaurant {
    constructor(restaurant) {
        this.id = restaurant.id;
        this.name = restaurant.name;
        this.imgUrl = restaurant.imgUrl;
        this.address = restaurant.address;
        this.phone = restaurant.phone;
        this.yelpID = restaurant.yelpID;
    }

    static getAll() {
        return db
        .manyOrNone('SELECT * FROM user_restaurants')
    }

    save() {
        return db
            .one(
                `INSERT INTO restaurants (name, imgUrl, address, phone, yelpID)
                VALUES ($/name/, $/img_url/, $/address/, $/phone/, $/yelp_id/)
                RETURNING *`, this
        ).then((restaurant) => {
            return Object.assign(this, restaurant)
        })
    }
}