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
    return db
      .oneOrNone("SELECT * FROM users WHERE username = $1", username)
      .then((user) => {
        if (user) return new this(user);
        throw new Error("no user found");
      });
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

  findUserTodos() {
    return db
      .manyOrNone("SELECT * FROM todos WHERE user_id = $1", this.id)
      .then((todos) => {
        return todos.map((todo) => new Animal(todo));
      });
  }
}

module.exports = User;