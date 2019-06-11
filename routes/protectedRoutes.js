var router = require("express").Router();
//var db = require("../models");

router.use(require("./protection"));
router.use(require("./resolveUser"));

router.get("/", function(req, res) {
  let { isInstructor, user } = req.user;
  if (isInstructor) {
    res.render("instructor", user);
  } else {
    res.render("student", user);
  }
});

module.exports = router;
