'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    preferredcontact: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  // }
);
User.associate = function (models) {
  User.belongsToMany(models.Role, {
    through: 'user_roles',
    as: 'role',
    onDelete: 'cascade'
  });
}
User.associate = function (models) {
  User.belongsToMany(models.Question, {
    through: 'question_users',
    as: 'question',
    onDelete: 'cascade'
  });
}
// User.associate = function (models) {
//   User.belongsToMany(models.Group, {
//     through: 'user_groups',
//     as: 'group',
//     onDelete: 'cascade'
//   });
// }
  return User;
};