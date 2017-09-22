'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_answer_a = sequelize.define('question_answer_a', {
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

question_answer_a.associate = function (models){
  question_answer_a.belongsTo(models.Answer, {
    foreignKey:'answerId',
    as:'answer',
  });
}
question_answer_a.associate = function (models){
  question_answer_a.belongsTo(models.Question, {
    foreignKey:'questionId',
    as:'question',
  });
}
  return question_answer_a;
};