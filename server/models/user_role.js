'use strict';
module.exports = function (sequelize, DataTypes) {
  var user_role = sequelize.define('user_role', {
    userId: DataTypes.STRING,
    roleId: DataTypes.STRING
  }
  // , {
  //     classMethods: {
  //       associate: function (models) {
  //         // associations can be defined here       
  //         // user_role.belongsTo(models.User, {
  //         //   foreignKey: 'userId',
  //         //   as: 'user',
  //         // });
  //         // user_role.belongsTo(models.Role, {
  //         //   foreignKey: 'roleId',
  //         //   as: 'role',
  //         // });
  //       }
  //     }
  //   }
  );
  user_role.associate = function (models) {
    user_role.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    user_role.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
  }
  return user_role;
};