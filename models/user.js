'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasOne(models.debit,{
        foreignKey: 'user_id'
      });

      models.user.hasOne(models.credit,{
        foreignKey: 'user_id'
      });

    }
  };
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    underscored:true
  });
  return user;
};