'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING,
        defaultValue:"5111111111111111",
      },
      expiration_month: {
        type: Sequelize.INTEGER,
        defaultValue:10
      },
      expiration_year: {
        type: Sequelize.INTEGER,
        defaultValue:2030
      },
      cvv: {
        type: Sequelize.INTEGER,
        defaultValue:211
      },
      currency:{
        type:Sequelize.STRING,
        defaultValue:"USD"
      },
      expenditure: {
        type: Sequelize.DOUBLE,
        defaultValue:0.00
      },
      month_limit: {
        type: Sequelize.DOUBLE,
        defaultValue:50000.00
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credits');
  }
};