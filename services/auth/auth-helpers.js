//adding bcryptjs to compare passwords
const bcrypt = require("bcryptjs");

//comparing passwords
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

//Redirect is unable to login
function loginRedirect(req, res, next) {
  if (req.user) return res.redirect("/user");
  return next();
}

//Redirect users to login when not logged in
function loginRequired(req, res, next) {
  console.log("Arrive auth helper");
  if (!req.user) return res.redirect("/auth/login");
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
};
