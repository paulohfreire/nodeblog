'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'texto',
    {
      type: Sequelize.STRING
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'texto');
  }
};
