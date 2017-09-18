'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_type = sequelize.define('question_type', {
    questionId: DataTypes.STRING,
    typeId: DataTypes.STRING,
  }
);
question_type.associate = function(models) {
  question_type.belongsTo(models.Question, {
    foreignKey: 'questionId',
    as:'question'
  });
  question_type.belongsTo(models.Type, {
    foreignKey: 'typeId',
    as:'type'
  });
}
  return question_type;
};