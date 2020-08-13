const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { ok } = require("assert");

const usersController = {
  index(req, res, next) {
    res.render("user/index", {
      message: "Put a user profile page on this route",
      data: {
        user: req.user,
        params: req.params,
      },
    });
  },
  //Register new users
  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    new User({
      username: req.body.username,
      email: req.body.email,
      password_digest: hash,
    })
      .save()
      .then((user) => {
        req.login(user, (err) => {
          if (err) return next(err);
          res.redirect("/auth/login"); //this was /user
        });
      })
      .catch(next);
  },
};

module.exports = usersController;
