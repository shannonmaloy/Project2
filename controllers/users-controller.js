const bcrypt = require("bcryptjs");
const User = require("../models/User");

const usersController = {
  //Direct users to their profile page
  index(req, res, next) {
    res.json({
      message: "Put a user profile page on this route",
      data: {
        user: req.user,
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
          res.redirect("/user");
        });
      })
      .catch(next);
  },
};

module.exports = usersController;
