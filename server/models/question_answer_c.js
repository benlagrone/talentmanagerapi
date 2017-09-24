'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_answer_c = sequelize.define('question_answer_c', {
    answerId: DataTypes.STRING,
    questionId: DataTypes.STRING
  }
);
question_answer_c.associate = function (models){
  question_answer_c.belongsTo(models.Answer, {
    foreignKey:'answerId',
    as:'answer',
  });
}
question_answer_c.associate = function (models){
  question_answer_c.belongsTo(models.Question, {
    foreignKey:'questionId',
    as:'question',
  });
}
  return question_answer_c;
};