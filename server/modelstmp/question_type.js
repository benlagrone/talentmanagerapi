'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_type = sequelize.define('question_type', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          question_type.belongsTo(models.Type, {
          foreignKey: 'typeId',
          as: 'type',
        });
          question_type.belongsTo(models.Question, {
          foreignKey: 'questionId',
          as: 'question',
        });
      }
    }
  });
  return question_type;
};