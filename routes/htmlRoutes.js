var db = require("../models");
var passport = require("passport");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Instructor.findAll().then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function(req, res) {
      console.log(req);
      res.redirect("/instructor/1");
    }
  );

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  app.post("/instructor", function (req, res) {
    db.Instructor.create({
      firstName: "Susy",
      lastName: "Q",
      email: "foo@bar.com",
      phone: "5554441234"
    }).then(result => {
      res.json(result);
    });
  });
};