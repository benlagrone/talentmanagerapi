'use strict';
module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    description: DataTypes.STRING
  }
  // , {
  //     classMethods: {
  //       associate: function (models) {
  //         // associations can be defined here
  //         Group.belongsToMany(models.Grouptype, {
  //           through: 'group_grouptype',
  //           as: 'grouptype'
  //         });
  //         Group.belongsToMany(models.User, {
  //           through: 'user_group',
  //           as: 'user'
  //         });
  //         Group.belongsToMany(models.Question, {
  //           through: 'question_group',
  //           as: 'Question',
  //         });
  //       }
  //     }
    // }
  );
  Group.associate = function(models){
    Group.belongsToMany(models.Group, {
      through: 'user_group',
      as: 'user',
      onDelete: 'cascade'
    })
  }
  return Group;
};