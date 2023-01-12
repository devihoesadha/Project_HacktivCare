'use strict';

const fs = require('fs')
const { hashPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
    userData = userData.map(perData => {
      perData.createdAt = new Date()
      perData.updatedAt = new Date()
      perData.password = hashPassword(perData.password)

      return perData
    })
    return queryInterface.bulkInsert("Users", userData, null)
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", userData, null)
  }
};
