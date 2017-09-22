'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    description: DataTypes.STRING,
    questiontext: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    weight: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here     
        Question.belongsToMany(models.User, {
            through: 'question_user',
            as: 'User',
          });
          Question.belongsToMany(models.Answer, {
            through: 'question_answer',
            as: 'Answers',
          });
          Question.belongsToMany(models.Answer, {
            through: 'question_answer',
            as: 'Answer',
          });
          Question.belongsToMany(models.Type, {
            through: 'question_type',
            as: 'Type',
          });
          Question.belongsToMany(models.Category, {
            through: 'question_category',
            as: 'Category',
          });
          Question.belongsToMany(models.Group, {
            through: 'question_group',
            as: 'Group',
          });
      }
    }
  });
  return Question;
};