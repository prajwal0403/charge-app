'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name:        { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      price:       { type: DataTypes.FLOAT, allowNull: false },
      createdBy:   { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );

  Product.associate = function(models) {
    // Each product “belongs to” the User who created it.
    Product.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'admin',
      onDelete: 'CASCADE',
    });
  };

  return Product;
};
