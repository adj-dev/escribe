//var db = require("../models");

module.exports = function(app) {
  // Load index page
  // Render 404 page for any unmatched routes

  app.get("/about", function(req, res) {
    res.render("about");
  });
};
