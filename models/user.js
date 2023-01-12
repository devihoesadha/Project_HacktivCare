'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg:`Username must be unique`
      },
      validate: {
        notNull: {
          msg: `Username cannot be Empty`
        },
        notEmpty: {
          msg: `Username cannot be Empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email cannot be Empty`
        },
        notEmpty: {
          msg: `Email cannot be Empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password cannot be Empty`
        },
        notEmpty: {
          msg: `Password cannot be Empty`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `role cannot be Empty`
        },
        notEmpty: {
          msg: `role cannot be Empty`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};