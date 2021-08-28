'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.credit.belongsTo(models.user,{
        foreignKey: 'user_id'
      });

    }
  };
  credit.init({
    user_id: DataTypes.INTEGER,
    number: DataTypes.STRING,
    expiration_month: DataTypes.INTEGER,
    expiration_year: DataTypes.INTEGER,
    cvv: DataTypes.INTEGER,
    currency:DataTypes.STRING,
    expenditure: DataTypes.DECIMAL(10,2),
    month_limit: DataTypes.DECIMAL(10,2),
    day_limit: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'credit',
    underscored:true
  });
  return credit;
};