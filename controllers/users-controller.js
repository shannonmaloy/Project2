const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { ok } = require("assert");

const usersController = {
  index(req, res, next) {
    console.log("Enter userController.index")
    console.log(res)
    res.render("user/index", {
      message: "ok",
      success: false,
      data: {
        user: req.user,
        params: req.params,
      },
    }).catch(next)
  },

  show(req, res, next) {
    User.getById(req.params.id)
      .then((user) => {
        res.locals.user = user
        next()
      }).catch(next)
  },

  showHistory(req, res, next) {
    
    User.getAllHistory(req.user.id)
      .then((restaurants) => {
        res.render('user/profile', {
          message: 'ok',
          success: true,
          data: {
            restaurants: restaurants,
            user: req.user
          }
      })
    }).catch(next)
  },

  //Register new users
  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    new User({
      username: req.body.username,
      email: req.body.email,
      password_digest: hash,
      fullname: req.body.fullname,
      streetaddress: req.body.streetaddress,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zipCode,
    })
      .save()
      .then((user) => {
        req.login(user, (err) => {
          if (err) return next(err);
          res.redirect("/user/profile"); 
        });
      })
      .catch(next);
  },
  //Allow users to edit their profiles
  update(req, res, next) {
    User.getById(req.params.id)
      .then((user) => {
      return user.update(req.body)
      }).then((updatedUser) => {
      res.redirect('/user/profile')
    }).catch(next)
  }
};

module.exports = usersController;
