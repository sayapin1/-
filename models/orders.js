'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Members, { foreignKey: 'memberId' });
      this.belongsTo(models.Goods, { foreignKey: 'goodsId' })
    }
  }
  Orders.init({
    goodsId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};