'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answertext: {
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
      // questionId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Questions',
      //     key: 'id',
      //     as: 'questionId',
      //   },
      // },
      // userId: {
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
    return queryInterface.dropTable('Answers');
  }
};