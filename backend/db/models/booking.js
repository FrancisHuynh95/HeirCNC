'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {foreignKey: 'userId'})
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  Booking.init({
    startDate: {
      type: DataTypes.DATE,

    },
    endDate: {
      type: DataTypes.DATE,

    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      }
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots'
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
