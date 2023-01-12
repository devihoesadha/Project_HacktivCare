'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let productData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
    productData = productData.map(perData => {
      perData.createdAt = new Date()
      perData.updatedAt = new Date()

      return perData
    })
    return queryInterface.bulkInsert("Products", productData, null)  
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Products", productData, null) 
  }
};
