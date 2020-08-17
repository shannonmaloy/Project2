const db = require("../db/config");
// const Restaurants = require("./Restaurants");

class User {
  constructor({
    id,
    username,
    email,
    password_digest,
    name,
    address,
    city,
    state,
    zip_code,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_digest = password_digest;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;
  }
  //Static Methods
  static findByUserName(username) {
    return db.oneOrNone("SELECT * FROM users WHERE username = $1", username);
    
  }

  static getById(id) {
    return db
      .oneOrNone("SELECT * FROM users WHERE id = $1", id)
      .then((user) => {
        if (user) return new this(user);
        throw new Error("no user found");
      });
  }
  //Instance Methods
  save() {
    console.log("got here");
    return db

      .one(
        `WITH new_restaurant AS (
          INSERT INTO restaurants (name, yelp_alias,address, city, state, zip_code) VALUES ($/name/, $/yelp_alias/, $/address/, $/city/, $/state/, $/zip_code/)
          RETURNING id as restaurant_id
      )
      INSERT INTO user_restaurants (restaurant_id, user_id)
      VALUES
      ((SELECT restaurant_id FROM new_restaurant), $/user_id/);`,
        this
      )
      .then((savedUser) => Object.assign(this, savedUser));
  }
}

module.exports = User;
