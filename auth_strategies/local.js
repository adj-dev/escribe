let Strategy = require("passport-local").Strategy;
let db = require("../models");

//A strategy is the way we are authenticating. A local stategy is one that doesn't user 3rd party auth.
//This is the simplest strategy. We are storing the username and password in plaintext in the db (I know, I know. super insecure. It's just an example, don't judge)
//To authenticate:
// 1. check if the user is in the database
// 2. check if the password matches
const strategy = new Strategy(
  //
  {
    usernameField: "email",
    passwordField: "password"
  },
  //{  session: true },
  //Passport will give us the username and password and the "done" function.

  function(email, password, done) {
    console.log(email);

    db.User.findOne({ where: { email: email } }).then(user => {
      validateUser(user, password, done);
    });
  }
);

function validateUser(user, password, done) {
  console.log(user);

  console.log(
    "Back from the database! Let's check if our credentials are good: "
  );

  if (!user) {
    console.log("User " + email + " was not in the DB");
    return done(null, false, { message: "Incorrect email." });
  }
  if (!instructor.validPassword(password)) {
    // if (!(DBuser.password===password)) {
    return done(null, false, { message: "Incorrect password." });
  }
  // if the user exists, and the passwords match, we have a successful Authentication!
  // return the user object. This will get saved in req.user
  console.log("They are!");
  return done(null, user);
}

module.exports = strategy;
