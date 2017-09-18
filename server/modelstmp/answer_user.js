'use strict';
module.exports = function(sequelize, DataTypes) {
  var answer_user = sequelize.define('answer_user', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          answer_user.belongsTo(models.Answer, {
          foreignKey: 'answerId',
          as: 'answers',
        });
          answer_user.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      }
    }
  });
  return answer_user;
};