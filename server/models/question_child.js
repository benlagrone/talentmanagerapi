'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_child = sequelize.define('question_child', {
    questionParentId: DataTypes.STRING,
    questionChildId: DataTypes.STRING
  }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  // }
);

question_child.associate = function(models) {
  question_child.belongsTo(models.Question, {
    foreignKey: 'questionParentId',
    as:'questionParent'
  });
  question_child.belongsTo(models.Question, {
    foreignKey: 'questionChildId',
    as:'questionChild'
  });
}
  return question_child;
};