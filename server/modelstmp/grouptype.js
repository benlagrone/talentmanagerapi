'use strict';
module.exports = function (sequelize, DataTypes) {
  var Grouptype = sequelize.define('Grouptype', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Grouptype.belongsToMany(models.Group, {
            through: 'group_grouptype',
            as: 'groups',
          });
        },
      }
    });
  return Grouptype;
};