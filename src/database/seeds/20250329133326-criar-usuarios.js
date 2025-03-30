const bcryptj = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'Isabel pedro',
        email: 'isabel@gmail.com',
        password_hash: await bcryptj.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Bruno Somavie',
        email: 'bruno@gmail.com',
        password_hash: await bcryptj.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Bernardo da COsta',
        email: 'bernardo@gmail.com',
        password_hash: await bcryptj.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {

  }
};
