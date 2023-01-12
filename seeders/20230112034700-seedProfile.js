'use strict';
const fs = require('fs')

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
    let profileData = JSON.parse(fs.readFileSync('./data/profile.json', 'utf-8'))
    profileData = profileData.map(perData => {
      perData.createdAt = new Date()
      perData.updatedAt = new Date()

      return perData
    })
    return queryInterface.bulkInsert("Profiles", profileData, null)
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Profiles", profileData, null)
  }

};
