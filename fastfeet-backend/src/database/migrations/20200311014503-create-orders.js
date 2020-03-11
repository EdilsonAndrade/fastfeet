
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipient_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'recipients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',

    },
    deliveryman_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'delivery_mans',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    signature_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'files',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    product: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    canceled_at: {
      type: Sequelize.DATE,
    },
    start_date: {
      type: Sequelize.DATE,
    },
    end_date: {
      type: Sequelize.DATE,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('orders'),
};
