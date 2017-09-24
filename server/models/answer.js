'use strict';
module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    answertext: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }

  );
  Answer.associate = function(models) {
    Answer.belongsToMany(models.User, {
      through: 'user_groups',
      as: 'user',
      onDelete: 'cascade'
    });
  }
  Answer.associate = function(models) {
    Answer.belongsToMany(models.Question, {
      through: 'question_answers',
      as: 'question',
      onDelete: 'cascade'
    });
  }
  Answer.associate = function(models) {
    Answer.belongsToMany(models.Question, {
      through: 'question_answer_as',
      as: 'question',
      onDelete: 'cascade'
    });
  }
  return Answer;
};