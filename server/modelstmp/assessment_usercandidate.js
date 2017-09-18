'use strict';
module.exports = function(sequelize, DataTypes) {
  var assessment_usercandidate = sequelize.define('assessment_usercandidate', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          assessment_usercandidate.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'usercandidate',
        });
          assessment_usercandidate.belongsTo(models.Assessment, {
          foreignKey: 'assessmentId',
          as: 'assessment',
        });
      }
    }
  });
  return assessment_usercandidate;
};