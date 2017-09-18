'use strict';
module.exports = function(sequelize, DataTypes) {
  var questionlibrary_question = sequelize.define('questionlibrary_question', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        questionlibrary_question.belongsTo(models.Question, {
            foreignKey: 'questionId',
            as: 'questions',
          });
          questionlibrary_question.belongsTo(models.Grouptype, {
            foreignKey: 'questionlibraryId',
            as: 'questionlibrary',
          });
      }
    }
  });
  return questionlibrary_question;
};