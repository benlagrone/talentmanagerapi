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
  // Question.belongsToMany(models.Category, {
  //   through: 'question_category',
  //   as: 'category',
  //   onDelete: 'cascade'
  // });
}
  return Question;
};