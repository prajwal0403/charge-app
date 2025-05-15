// ===== server/middleware/auth.js =====
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware to authenticate JWT token
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ msg: 'Token is not valid' });
  }
}

// Middleware to authorize based on user role
function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ msg: 'Forbidden: insufficient rights' });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRole
};