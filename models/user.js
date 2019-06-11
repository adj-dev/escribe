// Pull in sequelize and db connection
const Sequelize = require("sequelize");
const sequelize = require("../config");

// Instantiate the Instructor model
const User = sequelize.define("User", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg:
          "User `email` value needs to be in standard email format e.g. foo@bar.com"
      } // checks for email format
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isInstructor: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

User.associate = function(models) {
  User.hasMany(models.Instructor, { onDelete: "cascade" });
  User.hasMany(models.Student, { onDelete: "cascade" });
};

// Set up a method for authentication
User.prototype.validPassword = function(password) {
  console.log("Password from the DB:", this.password);
  console.log("Password from the Client:", password);
  return this.password === password;
};

module.exports = User;
