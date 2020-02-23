
module.exports = {
  up: (queryInterface) => queryInterface.addConstraint('delivery_mans', ['avatar_id'], {
    type: 'foreign key',
    name: 'file_deliverman_fk',
    references: {
      table: 'files',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',

  }),

  down: (queryInterface) => queryInterface.removeConstraint('delivery_mans', 'file_deliverman_fk'),
};
