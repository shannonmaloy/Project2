const db = require('../db/config')

class Restaurant {
    constructor(restaurant) {
        this.id = restaurant.id;
        this.name = restaurant.name;
        this.yelp_alias = restaurant.yelpAlias;
        this.address = restaurant.address;
        this.city = restaurant.city;
        this.state = restaurant.state;
        this.zip_code = restaurant.zipCode;
        this.user_id = restaurant.user_id;
        this.notes = restaurant.notes;
    }

    static getAll() {
        return db
        .manyOrNone('SELECT * FROM user_restaurants')
    }

    save() {
        console.log(this.user_id)
        return db
            .one(
                `WITH new_restaurant AS (
                    INSERT INTO restaurants (name, yelp_alias,address, city, state, zip_code) VALUES ($/name/, $/yelp_alias/, $/address/, $/city/, $/state/, $/zip_code/)
                    RETURNING id as restaurant_id
                )
                INSERT INTO user_restaurants (restaurant_id, user_id)
                VALUES
                ((SELECT restaurant_id FROM new_restaurant), $/user_id/) RETURNING *`, this
        ).then((restaurant) => {
            return Object.assign(this, restaurant)
        })
    }
}

module.exports = Restaurant