'use strict';
module.exports = function(sequelize, DataTypes) {
  var questionlibrary_user = sequelize.define('questionlibrary_user', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          questionlibrary_user.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
          questionlibrary_user.belongsTo(models.Questionlibrary, {
          foreignKey: 'questionlibraryId',
          as: 'questionlibrary',
        });
      }
    }
  });
  return questionlibrary_user;
};