'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'id' },
        field: 'home_team_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    })
  },

  down: async (queryInterface) => {
     await queryInterface.dropTable('matches');
  }
};
