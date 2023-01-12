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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Product Name cannot be Empty`
        },
        notEmpty: {
          msg: `Product Name cannot be Empty`
        }
      }
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `price cannot be Empty`
        },
        notEmpty: {
          msg: `price cannot be Empty`
        },
        min: {
          args: 1,
          msg: `price cannot be 0`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `stock cannot be Empty`
        },
        notEmpty: {
          msg: `stock cannot be Empty`
        },
        min: {
          args: 1,
          msg: `stock minimum`
        }
      }
    },
    imageURL: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};