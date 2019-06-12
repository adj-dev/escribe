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
    db.Instructor.findOne(condition).then(function(instructor) {
      //console.log(instructor.dataValues);
      req.user = { isInstructor: true, user: instructor.dataValues };
      next();
    });
  } else {
    condition = {
      include: [db.Lesson],
      where: { UserId: user.id }
    };
    db.Student.findOne(condition).then(function(student) {
      req.user = { isInstructor: false, user: student.dataValues };
      next();
    });
  }

  //   if (req.dataValues.isInstructor) {
  //     db.Instructor.findbyPk(req.user.id).then(insData => {
  //       req.InstructorData = insData;
  //       next();
  //     });
  //   } else {
  //     db.Student.findbyPk(req.user.id).then(studData => {
  //       req.user.details = studData;
  //       next();
  //     });
  //   }
};

module.exports = resolveUser;
