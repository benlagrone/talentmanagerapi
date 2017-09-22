'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('assessment_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assessmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assessments',
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
    return queryInterface.dropTable('assessment_questions');
  }
};