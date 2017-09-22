'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('question_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        groupId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Groups',
            key: 'id'
          },
          allowNull: false
        },
        questionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Questions',
            key: 'id'
          },
          allowNull: false
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('question_groups');
  }
};