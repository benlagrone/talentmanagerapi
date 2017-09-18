'use strict';
// sequelize model:create --name Role --attributes name:string,description:string,active:boolean
module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }
  // ,{
  //     classMethods: {
  //       associate: function (models) {
  //         // associations can be defined here
  //         Role.belongsToMany(models.User, {
  //           through: 'user_role',
  //           as: 'user'
  //         });
  //       }
  //     }
  //   }
  );
  Role.associate = function(models){
    Role.belongsToMany(models.User, {
      through: 'user_role',
      as: 'user'
    });
  }
  return Role;
};