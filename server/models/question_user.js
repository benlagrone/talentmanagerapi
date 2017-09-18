'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_user = sequelize.define('question_user', {
    userId: DataTypes.STRING,
    questionId: DataTypes.STRING
  }
);
question_user.associate = function(models) {
  question_user.belongsTo(models.Question, {
    foreignKey: 'questionId',
    as:'question'
  });
  question_user.belongsTo(models.User, {
    foreignKey: 'userId',
    as:'user'
  });
}
  return question_user;
};