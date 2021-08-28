'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class debit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.debit.belongsTo(models.user,{
        foreignKey: 'user_id'
      });
    }
  };
  debit.init({
    user_id: DataTypes.INTEGER,
    number: DataTypes.STRING,
    expiration_month: DataTypes.INTEGER,
    expiration_year: DataTypes.INTEGER,
    cvv: DataTypes.INTEGER,
    currency:DataTypes.STRING,
    balance: DataTypes.DECIMAL(10,2),
    day_limit: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'debit',
    underscored:true
  });
  return debit;
};