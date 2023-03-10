'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product, { foreignKey: "ProductId" })
      Cart.belongsTo(models.Profile, { foreignKey: "ProfileId" })
    }
  }
  Cart.init({
    ProfileId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });

  Cart.addHook('beforeCreate',(cart,options)=>{
    cart.quantity = 1;
  })
  
  return Cart;
};