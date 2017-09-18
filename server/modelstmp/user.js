'use strict';
// sequelize model:create --name User --attributes name:string,email:string,firstname:string,lastname:string,phone1:string,phone2:string,preferredcontact:string,active:boolean
module.exports = function (sequelize, DataTypes) {
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
    //     classMethods: {
    //       associate: function (models) {
    //         // associations can be defined here
    //         User.belongsToMany(models.Role, {
    //           through: 'user_role',
    //           as: 'role'
    //         });
    //         User.belongsToMany(models.Group, {
    //           though: 'user_group',
    //           as: 'Group',
    //         });
    //         User.belongsToMany(models.Question, {
    //           through: 'question_user',
    //           as: 'Question',
    //         });
    //       }
    //     }
    //   }
  );

  User.associate = function (models) {
    User.belongsToMany(models.Role, {
      through: 'user_role',
      as: 'role'
    });
  }
  return User;
};