'use strict';
const { Op,
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
    }

    static searchProductByTitle(searchProduct) {
      let option = {
        where: {},
        order: [
          ["createdAt", "DESC"]
        ]
      }
      if (searchProduct) {
        option.where.name = {
          [Op.iLike]: `%${searchProduct}%`
        }
      }
      return Product.findAll(option)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    imageURL: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};