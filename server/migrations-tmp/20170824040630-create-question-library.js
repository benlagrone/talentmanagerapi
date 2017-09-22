'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('QuestionLibraries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // QuestionId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Questions',
      //     key: 'id',
      //     as: 'questionId',
      //   },
      // },
      // UserId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //     as: 'userId',
      //   },
      // },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('QuestionLibraries');
  }
};