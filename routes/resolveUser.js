var db = require("../models");

const resolveUser = (req, res, next) => {
  let user = req.user.dataValues;
  //req.user = { hi: "hello" };
  let condition = {};
  if (user.isInstructor) {
    condition = {
      include: [{ model: db.Student, include: db.Lesson }],
      where: { UserId: user.id }
    };
    db.Instructor.findOne(condition).then(function (instructor) {
      //console.log(instructor.dataValues);
      req.user = { isInstructor: true, user: instructor.dataValues };
      next();
    })
      .catch(err => {
        if (err) {
          return;
        }
      });
  } else {
    condition = {
      include: [db.Lesson],
      where: { UserId: user.id }
    };
    db.Student.findOne(condition).then(function (student) {
      req.user = { isInstructor: false, user: student.dataValues };
      next();
    })
      .catch(err => {
        if (err) {
          return;
        }
      });
  }
};

module.exports = resolveUser;
