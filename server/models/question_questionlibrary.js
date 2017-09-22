'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_questionlibrary = sequelize.define('question_questionlibrary', {
    questionLibraryId: DataTypes.STRING,
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
question_questionlibrary.associate = function (models){
  question_questionlibrary.belongsTo(models.QuestionLibrary, {
    foreignKey:'questionlibraryId',
    as:'questionlibrary',
  });
}
question_questionlibrary.associate = function (models){
  question_questionlibrary.belongsTo(models.Question, {
    foreignKey:'questionId',
    as:'question',
  });
}
  return question_questionlibrary;
};