'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname:   { type: DataTypes.STRING, allowNull: false },
      lastname:    { type: DataTypes.STRING, allowNull: false },
      email:       { type: DataTypes.STRING, allowNull: false, unique: true },
      password:    { type: DataTypes.STRING, allowNull: false },
      role:        { type: DataTypes.ENUM('admin', 'customer'), allowNull: false },
    },
    {}
  );

  User.associate = function(models) {
    // An Admin user “has many” products they’ve created.
    User.hasMany(models.Product, {
      foreignKey: 'createdBy',
      as: 'products',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
