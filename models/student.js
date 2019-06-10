module.exports = function(sequelize, DataTypes) {
  // Instantiate the Student model
  const Student = sequelize.define("Student", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Student `firstName` value cannot be an empty string"
        }, // don't allow empty strings
        isAlpha: { msg: "Student `firstName` value must contain only letters" } // will only allow letters
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Student `lastName` value cannot be an empty string" },
        isAlpha: { msg: "Student `lastName` value must contain only letters" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg:
            "Student `email` value needs to be in standard email format e.g. foo@bar.com"
        } // checks for email format
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Student `phone` value cannot be an empty string" },
        isNumeric: { msg: "Student `phone` value must contain only numbers" } // only allows numbers
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Student.associate = function(models) {
    // Associate with Instructor model
    Student.belongsTo(models.Instructor, { foreignKey: { allowNull: false } });

    // Associate with Lesson model
    Student.hasMany(models.Lesson, { onDelete: "cascade" });
  };

  return Student;
};
