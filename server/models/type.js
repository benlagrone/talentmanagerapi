'use strict';
module.exports = function(sequelize, DataTypes) {
  var Type = sequelize.define('Type', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }
);
Type.associate = function(models){
  Type.belongsToMany(models.Question, {
    through: 'question_types',
    as: 'question',
    onDelete: 'cascade'
  });
}
  return Type;
};