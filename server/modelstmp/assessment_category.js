'use strict';
module.exports = function(sequelize, DataTypes) {
  var assessment_category = sequelize.define('assessment_category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          assessment_category.belongsTo(models.Category, {
          foreignKey: 'categoryId',
          as: 'category',
        });
          assessment_category.belongsTo(models.Assessment, {
          foreignKey: 'assessmentId',
          as: 'assessment',
        });
      }
    }
  });
  return assessment_category;
};