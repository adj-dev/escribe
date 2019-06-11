// Pull in sequelize and db connection
const Sequelize = require("sequelize");
const sequelize = require("../config");

// Instantiate the Lesson model
const Lesson = sequelize.define("Lesson", {
  topic: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: { msg: "Lesson `title` value cannot be an empty string" }, // don't allow empty strings
      isAlphanumeric: {
        msg: "Lesson `title` value must contain only letters and/or numbers"
      } // will only allow alphanumeric characters
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Lesson.associate = function(models) {
  Lesson.belongsTo(models.Student, { foreignKey: { allowNull: false } });
};

module.exports = Lesson;
