const express = require('express');
const router = express.Router();
const { ChargingStation, User } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// @route   GET /api/charging-stations
// @desc    Get all charging stations, optional filter by admin username
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { admin } = req.query;
    let where = {};
    
    if (admin) {
      // find user by email or username
      const user = await User.findOne({ where: { email: admin } });
      if (user) {
        where.createdBy = user.id;
      } else {
        return res.status(404).json({ msg: 'Admin user not found' });
      }
    }
    
    const chargingStations = await ChargingStation.findAll({ where });
    res.json(chargingStations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/charging-stations/all
// @desc    Get all charging stations
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const chargingStations = await ChargingStation.findAll();
    res.json(chargingStations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/charging-stations/:id
// @desc    Get charging station by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const chargingStation = await ChargingStation.findByPk(req.params.id);
    if (!chargingStation) return res.status(404).json({ msg: 'Charging station not found' });
    res.json(chargingStation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/charging-stations
// @desc    Create a new charging station
// @access  Admin
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  async (req, res) => {
    try {
      const { name, latitude, longitude, status, powerOutput, connectorType } = req.body;
      
      const chargingStation = await ChargingStation.create({
        name,
        latitude,
        longitude,
        status,
        powerOutput,
        connectorType,
        createdBy: req.user.id
      });
      
      res.status(201).json(chargingStation);
    } catch (err) {
      console.error(err);
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ msg: err.message });
      }
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   PUT /api/charging-stations/:id
// @desc    Update a charging station
// @access  Admin
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  async (req, res) => {
    try {
      const chargingStation = await ChargingStation.findByPk(req.params.id);
      
      if (!chargingStation) return res.status(404).json({ msg: 'Charging station not found' });
      
      if (chargingStation.createdBy !== req.user.id) {
        return res.status(403).json({ msg: 'Not allowed to modify this charging station' });
      }
      
      const { name, latitude, longitude, status, powerOutput, connectorType } = req.body;
      
      await chargingStation.update({
        name,
        latitude,
        longitude,
        status,
        powerOutput,
        connectorType
      });
      
      res.json(chargingStation);
    } catch (err) {
      console.error(err);
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ msg: err.message });
      }
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   DELETE /api/charging-stations/:id
// @desc    Delete a charging station
// @access  Admin
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  async (req, res) => {
    try {
      const chargingStation = await ChargingStation.findByPk(req.params.id);
      
      if (!chargingStation) return res.status(404).json({ msg: 'Charging station not found' });
      
      if (chargingStation.createdBy !== req.user.id) {
        return res.status(403).json({ msg: 'Not allowed to delete this charging station' });
      }
      
      await chargingStation.destroy();
      res.json({ msg: 'Charging station removed' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   GET /api/charging-stations/nearby/:lat/:lng/:radius
// @desc    Find charging stations within a radius (km) of coordinates
// @access  Public
router.get('/nearby/:lat/:lng/:radius', async (req, res) => {
  try {
    const { lat, lng, radius } = req.params;
    
    // Convert latitude/longitude from params to numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const searchRadius = parseFloat(radius);
    
    // Simple distance calculation using the Haversine formula
    // This is done directly in Sequelize's query with a raw SQL function
    const chargingStations = await ChargingStation.findAll({
      attributes: {
        include: [
          [
            // This raw SQL calculates the distance in km using the Haversine formula
            // Note: Replace this with your database's specific geographic functions for better performance
            // (e.g., PostGIS for PostgreSQL or ST_Distance for MySQL)
            sequelize.literal(`
              (
                6371 * acos(
                  cos(radians(${latitude})) * cos(radians(latitude)) *
                  cos(radians(longitude) - radians(${longitude})) +
                  sin(radians(${latitude})) * sin(radians(latitude))
                )
              )
            `),
            'distance'
          ]
        ]
      },
      where: {
        status: 'Active' // Only return active stations
      },
      having: sequelize.literal(`distance <= ${searchRadius}`),
      order: sequelize.literal('distance ASC')
    });
    
    res.json(chargingStations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;