const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getStats,
  applicationValidation
} = require('../controllers/applicationsController');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/applications/stats
router.get('/stats', getStats);

// GET /api/applications
router.get('/', getAllApplications);

// POST /api/applications
router.post('/', applicationValidation, createApplication);

// GET /api/applications/:id
router.get('/:id', getApplication);

// PUT /api/applications/:id
router.put('/:id', applicationValidation, updateApplication);

// DELETE /api/applications/:id
router.delete('/:id', deleteApplication);

module.exports = router; 