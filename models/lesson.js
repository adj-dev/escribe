module.exports = function(sequelize, DataTypes) {
  // Instantiate the Lesson model
  const Lesson = sequelize.define("Lesson", {
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //isEmpty: { msg: "Lesson `topic` value cannot be an empty string" } // don't allow empty strings
        // isAlphanumeric: {
        //   msg: "Lesson `topic` value must contain only letters and/or numbers"
        // } // will only allow alphanumeric characters
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Lesson.associate = function(models) {
    // Associate with Student model
    Lesson.belongsTo(models.Student, { foreignKey: { allowNull: false } });
  };

  return Lesson;
};
