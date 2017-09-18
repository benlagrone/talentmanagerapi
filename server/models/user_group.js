'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_group = sequelize.define('user_group', {
    userId: DataTypes.STRING,
    groupId: DataTypes.STRING
  }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  // }
);
user_group.associate = function (models){
  user_group.belongsTo(models.User, {
    foreignKey:'userId',
    as:'user',
  });
}
user_group.associate = function (models){
  user_group.belongsTo(models.Group, {
    foreignKey:'groupId',
    as:'group',
  });
}
  return user_group;
};