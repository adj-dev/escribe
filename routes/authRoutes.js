var router = require("express").Router();
var db = require("../models");

module.exports = function(passport) {
  router.get("/whodis", function(req, res) {
    res.render("auth");
  });
  router.post(
    "/login",
    passport.authenticate("local"), //this is the magic
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      //res.sendFile()
      console.log(req.user.dataValues);
      let { isInstructor } = req.user.dataValues;
      let condition;
      if (isInstructor) {
        condition = {
          include: [
            {
              model: db.Instructor,
              include: [{ model: db.Student, include: db.Lesson }]
            }
          ],
          where: { id: req.user.dataValues.id }
        };
      } else {
        condition = {
          include: [{ model: db.Student, include: db.Lesson }],
          where: { id: req.user.dataValues.id }
        };
      }

      db.User.findOne(condition).then(function(user) {
        res.json({ success: req.user ? "Yes" : "No", user: user });
      });

      //res.json({ success: req.user ? "Yes" : "No", user: req.user });
    }
  );

  // Create a new Instructor
  router.post("/signup", function(req, res) {
    console.log(req.body);
    db.Instructor.create(req.body).then(function(instructor) {
      res.json(instructor);
    });
  });

  router.post(
    "/logout",

    function(req, res) {
      req.logout();

      res.json({
        success: req.user ? "No" : "Yes",
        user: req.user
      });
    }
  );

  return router;
};
