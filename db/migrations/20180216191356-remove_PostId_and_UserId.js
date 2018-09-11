'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Posts', 'UserId');
    queryInterface.removeColumn('Comments', 'PostId');
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Posts', 'UserId', { type: Sequelize.INTERGER, allowNull: false });
    queryInterface.addColumn('Comments', 'PostId', { type: Sequelize.INTERGER, allowNull: false });
  }
};
