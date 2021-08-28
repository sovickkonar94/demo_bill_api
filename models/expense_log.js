'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expense_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  expense_log.init({
    user_id: DataTypes.INTEGER,
    card_type: DataTypes.STRING,
    card_number: DataTypes.STRING,
    currency: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    auth_code: DataTypes.STRING,
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'expense_log',
    underscored:true
  });
  return expense_log;
};