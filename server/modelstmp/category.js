'use strict';
module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Category.belongsToMany(models.Assessment, {
            through: 'assessment_category',
            as: 'Assessment',
          });
          Category.belongsToMany(models.Question, {
            through: 'question_category',
            as: 'Question',
          });
          Category.belongsToMany(models.QuestionLibrary, {
            through: 'questionlibrary_category',
            as: 'QuestionLibrary',
          });
        }
      }
    });
  return Category;
};