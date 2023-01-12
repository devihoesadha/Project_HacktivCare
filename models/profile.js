'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "UserId" })
      Profile.hasMany(models.Cart)
    }
  }
  Profile.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `userName cannot be Empty`
        },
        notEmpty: {
          msg: `userName cannot be Empty`
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `firstName cannot be Empty`
        },
        notEmpty: {
          msg: `firstName cannot be Empty`
        }
      }
    },
    lastName: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: `birthday cannot be Empty`
        },
        notEmpty: {
          msg: `birthday cannot be Empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `email cannot be Empty`
        },
        notEmpty: {
          msg: `email cannot be Empty`
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
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};