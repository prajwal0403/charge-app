'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChargingStation = sequelize.define(
    'ChargingStation',
    {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      latitude: { 
        type: DataTypes.DECIMAL(10, 8), 
        allowNull: false,
        validate: {
          min: -90,
          max: 90
        }
      },
      longitude: { 
        type: DataTypes.DECIMAL(11, 8), 
        allowNull: false,
        validate: {
          min: -180,
          max: 180
        }
      },
      status: { 
        type: DataTypes.ENUM('Active', 'Inactive'), 
        allowNull: false,
        defaultValue: 'Active'
      },
      powerOutput: { 
        type: DataTypes.FLOAT, 
        allowNull: false,
        field: 'power_output'  // Snake case for DB column
      },
      connectorType: { 
        type: DataTypes.STRING, 
        allowNull: false,
        field: 'connector_type'  // Snake case for DB column
      },
      createdBy: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      }
    },
  );

  ChargingStation.associate = function(models) {
    // Each charging station "belongs to" the User who created it
    ChargingStation.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'admin',
      onDelete: 'CASCADE',
    });
  };

  return ChargingStation;
};