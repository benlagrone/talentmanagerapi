'use strict';
module.exports = function(sequelize, DataTypes) {
  var Type = sequelize.define('Type', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Type.belongsToMany(models.Question, {
          through: 'question_type',
          as: 'Question',
        });
      }
    }
  });
  return Type;
};