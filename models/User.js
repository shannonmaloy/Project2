const db = require("../db/config");
// const Restaurants = require("./Restaurants");

class User {
  constructor({ id, username, email, password_digest }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_digest = password_digest;
  }
  //Static Methods
  static findByUserName(username) {
    return db.oneOrNone("SELECT * FROM users WHERE username = $1", username);
    // .then((user) => {
    //   if (user) return new this(user);
    //   throw new Error("no user found - User.js 17");
    // });
  }

  static findByUserName(username) {
    return db.oneOrNone("SELECT * FROM users WHERE username = $1", username);
  }

  //Instance Methods
  save() {
    return db
      .one(
        `INSERT INTO users
        (username, email, password_digest)
        VALUES ($/username/, $/email/, $/password_digest/)
        RETURNING *`,
        this
      )
      .then((savedUser) => Object.assign(this, savedUser));
  }
}

module.exports = User;
