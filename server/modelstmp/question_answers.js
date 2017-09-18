'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_answers = sequelize.define('question_answers', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          question_answers.belongsTo(models.Answer, {
          foreignKey: 'answerId',
          as: 'answers',
        });
          question_answers.belongsTo(models.Question, {
          foreignKey: 'questionId',
          as: 'question',
        });
      }
    }
  });
  return question_answers;
};