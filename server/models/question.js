'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    description: DataTypes.STRING,
    questiontext: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    weight: DataTypes.INTEGER
  }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  // }
);

Question.associate = function (models) {
  Question.belongsToMany(models.User, {
    through: 'question_users',
    as: 'user',
    onDelete: 'cascade'
  });
  Question.belongsToMany(models.Type, {
    through: 'question_types',
    as: 'type',
    onDelete: 'cascade'
  });
  Question.belongsToMany(models.Category, {
    through: 'question_categories',
    as: 'category',
    onDelete: 'cascade'
  });
  Question.belongsToMany(models.QuestionLibrary, {
    through: 'questionlibrary_question',
    as: 'questionlibrary',
    onDelete: 'cascade'
  });
  Question.associate = function(models) {
    Question.belongsToMany(models.Answer, {
      through: 'question_answers',
      as: 'answer',
      onDelete: 'cascade'
    });
  }
  Question.associate = function(models) {
    Question.belongsToMany(models.Answer, {
      through: 'question_answer_as',
      as: 'answer_a',
      onDelete: 'cascade'
    });
  }
  // Question.belongsToMany(models.Question, {
  //   through: 'question_child',
  //   as: 'parent',
  //   onDelete: 'cascade'
  // });
  // Question.belongsToMany(models.Question, {
  //   through: 'question_child',
  //   as: 'child',
  //   onDelete: 'cascade'
  // });
}
  return Question;
};