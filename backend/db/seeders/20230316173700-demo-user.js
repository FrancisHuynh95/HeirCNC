'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@user.io',
        username: 'JohnDoe',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'user1@user.io',
        username: 'JaneDoe',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Jack',
        lastName: 'Doe',
        email: 'user2@user.io',
        username: 'JackDoe',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['JohnDoe', 'JaneDoe', 'JackDoe'] }
    }, {});
  }
};
