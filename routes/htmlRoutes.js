var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/instructor/:id", function(req, res) {
    let condition = {
      include: [{ model: db.Student, include: db.Lesson }],
      where: { id: req.params.id }
    };

    db.Instructor.findOne(condition).then(function(instructor) {
      console.log(instructor);
      res.render("instructor", instructor.dataValues);
    });
  });

  app.get("/student/:id", function(req, res) {
    let condition = { include: [db.Lesson], where: { id: req.params.id } };

    db.Student.findOne(condition).then(function(student) {
      res.render("student", student.dataValues);
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
