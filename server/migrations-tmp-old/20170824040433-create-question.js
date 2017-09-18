'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      questiontext: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      weight: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // UserId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //     as: 'userId',
      //   },
      // },
      // AnswerId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Answers',
      //     key: 'id',
      //     as: 'answerId',
      //   },
      // },
      // AnswersId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Answer',
      //     key: 'id',
      //     as: 'answersId',
      //   },
      // },
      // TypeId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Type',
      //     key: 'id',
      //     as: 'typeId',
      //   },
      // },
      // Categoryd: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Category',
      //     key: 'id',
      //     as: 'categoryId',
      //   },
      // },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Question');
  }
};