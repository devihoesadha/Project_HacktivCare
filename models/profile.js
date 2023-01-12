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

    toISOString() {
      // console.log(this.date)
      return new Date(this.dateOfBirth).toISOString().split('T')[0];
    }
    
    get age() {
      return new Date().getFullYear() - this.dateOfBirth.getFullYear()
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  // Profile.addHook("beforeCreate", (profile, options) => {
  //   profile.role = "customer"
  // })
  return Profile;
};