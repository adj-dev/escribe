// Pull in sequelize and db connection
const Sequelize = require("sequelize");
const sequelize = require("../config");



// Instantiate the Instructor model
const Instructor = sequelize.define("Instructor", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false, // won't allow null
    validate: {
      notEmpty: { msg: "Instructor `firstName` value cannot be an empty string" }, // don't allow empty strings
      isAlpha: { msg: "Instructor `firstName` value must contain only letters" } // will only allow letters
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Instructor `lastName` value cannot be an empty string" },
      isAlpha: { msg: "Instructor `lastName` value must contain only letters" }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "Instructor `email` value needs to be in standard email format e.g. foo@bar.com" } // checks for email format
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Instructor `phone` value cannot be an empty string" },
      isNumeric: { msg: "Instructor `phone` value must contain only numbers" } // only allows numbers
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});



Instructor.associate = function (models) {
  Instructor.hasMany(models.Student, { onDelete: "cascade" });
};



// Set up a method for authentication
Instructor.prototype.validPassword = function (password) {
  console.log("Password from the DB:", this.password);
  console.log("Password from the Client:", password);
  return (this.password === password);
};



module.exports = Instructor;