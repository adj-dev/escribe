var router = require("express").Router();
var db = require("../models");
const sendmail = require("sendmail")();

module.exports = function (passport) {
  router.get("/whodis", function (req, res) {
    res.render("auth");
  });
  router.post(
    "/whodis",
    passport.authenticate("local"), //this is the magic
    function (req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      //res.sendFile()
      console.log("Authenticated.");
      res.json({ success: true });
    }
  );

  router.post("/signup", function (req, res) {
    // grab the data out of req.body
    let { firstName, lastName, email, phone, password } = req.body;
    // create a new user
    let newUser;
    db.User.create({ email, password, isInstructor: true })
      .then(function (
        user
      ) {
        let id = user.id;
        newUser = user;
        sendmail(
          {
            from: "admin@enscribe.io",
            to: user.email,
            subject: "Welcome to Enscribe",
            html:
              "Your login info:<br>email: " +
              user.email +
              "<br>password: " +
              user.password +
              "<br><br>Click <a href='https://pure-wave-91989.herokuapp.com/' target='_blank'>here</a> to log in."
          },
          function (err, reply) {
            if (err) {
              return;
            }
            console.dir(reply);
            console.log("There");
          }
        );
        db.Instructor.create({
          firstName,
          lastName,
          email,
          phone,
          password,
          UserId: id
        }).then(function (instructor) {
          res.json(newUser);
        })
          .catch(err => {
            if (err) {
              return;
            }
          });
      });
  });

  router.post(
    "/logout",

    function (req, res) {
      req.logout();

      res.json({
        success: req.user ? "No" : "Yes",
        user: req.user
      });
    }
  );

  return router;
};
