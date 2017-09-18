'use strict';
module.exports = function(sequelize, DataTypes) {
  var group_grouptype = sequelize.define('group_grouptype', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          group_grouptype.belongsTo(models.Group, {
          foreignKey: 'groupId',
          as: 'groups',
        });
          group_grouptype.belongsTo(models.Grouptype, {
          foreignKey: 'grouptypeId',
          as: 'grouptypes',
        });
      }
    }
  });
  return group_grouptype;
};