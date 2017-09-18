'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
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
Role.associate = function(models){
  Role.belongsToMany(models.User, {
    through: 'user_roles',
    as: 'user',
    onDelete: 'cascade'
  });
}
  return Role;
};