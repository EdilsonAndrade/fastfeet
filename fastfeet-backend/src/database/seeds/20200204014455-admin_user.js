const bcrypt = require('bcryptjs');

module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        password_hash: bcrypt.hashSync('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, { email: 'admin@fastfeet.com' }),
};
