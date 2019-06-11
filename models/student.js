// Pull in sequelize and db connection
const Sequelize = require("sequelize");
const sequelize = require("../config");

const Student = sequelize.define("Student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Student `firstName` value cannot be an empty string" }, // don't allow empty strings
      isAlpha: { msg: "Student `firstName` value must contain only letters" } // will only allow letters
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Student `lastName` value cannot be an empty string" },
      isAlpha: { msg: "Student `lastName` value must contain only letters" }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg:
          "Student `email` value needs to be in standard email format e.g. foo@bar.com"
      } // checks for email format
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Student `phone` value cannot be an empty string" },
      isNumeric: { msg: "Student `phone` value must contain only numbers" } // only allows numbers
    }
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Student.associate = function(models) {
  Student.belongsTo(models.Instructor, { foreignKey: { allowNull: false } });
  Student.hasMany(models.Lesson, { onDelete: "cascade" });
};

// Set up a method for authentication
Student.prototype.validPassword = function(password) {
  console.log("Password from the DB:", this.password);
  console.log("Password from the Client:", password);
  return this.password === password;
};

Student.sync();

module.exports = Student;
