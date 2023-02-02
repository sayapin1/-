'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Orders, { foreignKey: 'memberId' });
      this.hasMany(models.Carts, { foreignKey: 'memberId' });
    }
  }
  Members.init({
    loginId: DataTypes.STRING,
    loginPw: DataTypes.STRING,
    memberName: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};