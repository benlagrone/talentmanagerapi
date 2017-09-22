'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_answer = sequelize.define('question_answer', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          question_answer.belongsTo(models.Answer, {
          foreignKey: 'answerId',
          as: 'answers',
        });
          question_answer.belongsTo(models.Question, {
          foreignKey: 'questionId',
          as: 'question',
        });
      }
    }
  });
  return question_answer;
};