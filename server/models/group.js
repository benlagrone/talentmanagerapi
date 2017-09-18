'use strict';
module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }
    // , {
    //     classMethods: {
    //       associate: function (models) {
    //         // associations can be defined here
    //       }
    //     }
    //   }
  );
  Group.associate = function(models) {
    Group.belongsToMany(models.User, {
      through: 'user_groups',
      as: 'user',
      onDelete: 'cascade'
    });
  }
  return Group;
};