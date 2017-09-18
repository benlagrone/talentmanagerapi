'use strict';
module.exports = function(sequelize, DataTypes) {
  var questionlibrary_category = sequelize.define('questionlibrary_category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        questionlibrary_category.belongsTo(models.Questionlibrary, {
          foreignKey: 'questionId',
          as: 'questionlibrary',
        });
        questionlibrary_category.belongsTo(models.Category, {
          foreignKey: 'categoryId',
          as: 'category',
        });
      }
    }
  });
  return questionlibrary_category;
};