'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_category = sequelize.define('question_category', {
    categoryId: DataTypes.STRING,
    questionId: DataTypes.STRING
  }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  // }
);

question_category.associate = function (models){
  question_category.belongsTo(models.Category, {
    foreignKey:'categoryId',
    as:'category',
  });
}
question_category.associate = function (models){
  question_category.belongsTo(models.Question, {
    foreignKey:'questionId',
    as:'question',
  });
}
  return question_category;
};