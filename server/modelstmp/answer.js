'use strict';
module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    answertext: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
      classMethods: {
        associate: (models) => {
          // associations can be defined here
          Answer.belongsToMany(models.Question, {
            through: 'question_answer',
            as: 'Questions',
          });
          Answer.belongsToMany(models.Question, {
            through: 'question_answers',
            as: 'QuestionAnswer',
          });
          Answer.belongsToMany(models.User, {
            through: 'answer_user',
            as: 'User',
          })
        }
      }
    });
  return Answer;
};