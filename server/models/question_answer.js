'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_answer = sequelize.define('question_answer', {
    answerId: DataTypes.STRING,
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
question_answer.associate = function (models){
  question_answer.belongsTo(models.Answer, {
    foreignKey:'answerId',
    as:'answer',
  });
}
question_answer.associate = function (models){
  question_answer.belongsTo(models.Question, {
    foreignKey:'questionId',
    as:'question',
  });
}
  return question_answer;
};