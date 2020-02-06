
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recipients', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address_line: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address_line_two: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zip_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('recipients'),
};
