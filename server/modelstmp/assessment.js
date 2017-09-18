'use strict';
module.exports = function(sequelize, DataTypes) {
  var Assessment = sequelize.define('Assessment', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          Assessment.belongsToMany(models.User, {
            through: 'assessment_userauthor',
            as: 'UserAuthor',
          });

          Assessment.belongsToMany(models.User, {
            through: 'assessment_usercandidate',
            as: 'UserCandidate',
          });

          Assessment.belongsToMany(models.Question, {
            through: 'assessment_question',
            as: 'Question',
          });
        }
    }
  });
  return Assessment;
};