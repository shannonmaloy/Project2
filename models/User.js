const db = require("../db/config");
// const Restaurants = require("./Restaurants");

class User {
  constructor({
    id,
    username,
    email,
    password_digest,
    fullname,
    streetaddress,
    city,
    state,
    zip_code,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_digest = password_digest;
    this.fullname = fullname;
    this.streetaddress = streetaddress;
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

  static getAllHistory(id) {
    return db
      .manyOrNone('SELECT * FROM restaurants JOIN user_restaurants ON restaurants.id = user_restaurants.restaurant_id JOIN users ON users.id = user_restaurants.user_id WHERE users.id = $1', id)
      .then((restaurants) => {
        return restaurants
        });
      
  }

  //Instance Methods
  save() {
    return db

      .one(
        `INSERT INTO users
        (username, email, password_digest, fullname, streetaddress, city, state, zip_code)
        VALUES ($/username/, $/email/, $/password_digest/, $/fullname/, $/streetaddress/, $/city/, $/state/, $/zip_code/)
        RETURNING *`,
        this
      )
      .then((savedUser) => Object.assign(this, savedUser));
  }

  update(changes) {
    Object.assign(this, changes)
    return db
      .oneOrNone(
        `UPDATE users SET
      email = $/email/,
      fullname = $/fullname/,
      streetaddress = $/streetaddress/,
      city = $/city/,
      state = $/state/,
      zip_code = $/zip_code/
      WHERE id = $/id/
      RETURNING *`, this
    ).then((user) => {
      return Object.assign(this, user)
    })
  }

  delete() {
    return db.oneOrNone('DELETE FROM users WHERE id = $1', this.id)
  }
}

module.exports = User;
