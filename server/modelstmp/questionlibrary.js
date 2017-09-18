'use strict';
module.exports = function(sequelize, DataTypes) {
  var QuestionLibrary = sequelize.define('QuestionLibrary', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          QuestionLibrary.belongsToMany(models.Question, {
            through: 'questionlibrary_question',
            as: 'Questions',
          });
          QuestionLibrary.belongsToMany(models.User, {
            through: 'questionlibrary_user',
            as: 'User',
          });
          QuestionLibrary.belongsToMany(models.Category, {
            through: 'questionlibrary_category',
            as: 'Category',
          });
      }
    }
  });
  return QuestionLibrary;
};