'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_user = sequelize.define('question_user', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          question_user.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
          question_user.belongsTo(models.Question, {
          foreignKey: 'questionId',
          as: 'question',
        });
      }
    }
  });
  return question_user;
};