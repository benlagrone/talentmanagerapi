'use strict';
module.exports = function(sequelize, DataTypes) {
  var assessment_userauthor = sequelize.define('assessment_userauthor', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          assessment_userauthor.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'userauthor',
        });
          assessment_userauthor.belongsTo(models.Assessment, {
          foreignKey: 'assessmentId',
          as: 'assessment',
        });
      }
    }
  });
  return assessment_userauthor;
};