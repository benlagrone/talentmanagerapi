'use strict';
module.exports = function(sequelize, DataTypes) {
  var assessment_question = sequelize.define('assessment_question', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          assessment_question.belongsTo(models.Question, {
          foreignKey: 'questionId',
          as: 'question',
        });
          assessment_question.belongsTo(models.Assessment, {
          foreignKey: 'assessmentId',
          as: 'assessment',
        });
      }
    }
  });
  return assessment_question;
};