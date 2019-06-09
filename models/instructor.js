module.exports = function (sequelize, DataTypes) {
  // Instantiate the Instructor model
  const Instructor = sequelize.define("Instructor", {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false, // won't allow null
        notEmpty: { msg: "Instructor `firstName` value cannot be an empty string" }, // don't allow empty strings
        isAlpha: { msg: "Instructor `firstName` value must contain only letters" } // will only allow letters
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        notEmpty: { msg: "Instructor `lastName` value cannot be an empty string" },
        isAlpha: { msg: "Instructor `lastName` value must contain only letters" }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        isEmail: { msg: "Instructor `email` value needs to be in standard email format e.g. foo@bar.com" } // checks for email format
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        notEmpty: { msg: "Instructor `phone` value cannot be an empty string" },
        isNumeric: { msg: "Instructor `phone` value must contain only numbers" } // only allows numbers
      }
    }
  });

  Instructor.associate = function (models) {
    // Associate with Student model
    Instructor.hasMany(models.Student, { onDelete: "cascade" });
  };

  return Instructor;
};
