'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_group = sequelize.define('question_group', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          question_group.belongsTo(models.Group, {
          foreignKey: 'groupId',
          as: 'group',
        });
          question_group.belongsTo(models.Question, {
          foreignKey: 'questionId',
          as: 'question',
        });
      }
    }
  });
  return question_group;
};