const sequelize = require("../config");
const User = require("./user.js");
const Instructor = require("./instructor.js");
const Student = require("./student.js");
const Lesson = require("./lesson.js");

// Make associations
User.associate({ Instructor, Student });
Instructor.associate({ User, Student });
Student.associate({ User, Instructor, Lesson });
Lesson.associate({ Student });

// Sync with the DB
let syncConfig = { force: false };
// uncomment the line below to reset all tables for development purposes.
// syncConfig.force = true;
//sequelize.sync(syncConfig);

module.exports = { Instructor, Student, Lesson, User };
