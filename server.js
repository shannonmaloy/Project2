//import from dependencies
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const yelp = require("./public/src/sample");
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");
const authHelpers = require("./services/auth/auth-helpers");
const restaurantRouter = require("./routes/restaurant-router");
const restaurantHelper = require('./services/restaurant-helper')

//initialize the app
const app = express();
//load the .env into the app
require("dotenv").config({path: '../.env'});

//middlewares
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//view and publics
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

//setting the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//ROOT ROUTE
app.get("/", authHelpers.loginRedirect, (req, res) => {
  res.render("index", {
    appName: "What's For Dinner",
    message: "Ok",
    success: false,
      data: {
        user: req.user,
        params: req.params,
      },
  });
});



// app.use("/restaurants", todoRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);

//non-used routes
app.use("*", (req, res) => {
  res.status(404).send({
    error: "Not Found",
  });
});

//error handler
//https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
app.use((err, req, res, next) => {
  res.status(500).send({ err, message: err.message });
});
