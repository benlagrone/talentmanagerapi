'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  // }
);
Category.associate = function(models){
  Category.belongsToMany(models.Question, {
    through: 'question_categories',
    as: 'question',
    onDelete: 'cascade'
  });
}
  return Category;
};