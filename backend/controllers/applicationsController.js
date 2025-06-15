const { body, validationResult } = require('express-validator');
const JobApplication = require('../models/JobApplication');

const validStatuses = ['applied', 'interview', 'offered', 'rejected'];

// Validation rules
const applicationValidation = [
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 255 })
    .withMessage('Company name must be less than 255 characters'),
  body('job_title')
    .trim()
    .notEmpty()
    .withMessage('Job title is required')
    .isLength({ max: 255 })
    .withMessage('Job title must be less than 255 characters'),
  body('application_date')
    .isISO8601()
    .withMessage('Please provide a valid date (YYYY-MM-DD)'),
  body('status')
    .isIn(validStatuses)
    .withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Notes must be less than 5000 characters')
];

const getAllApplications = async (req, res, next) => {
  try {
    const { status, dateFrom, dateTo, sortBy, sortOrder } = req.query;
    
    const filters = {};
    if (status && validStatuses.includes(status)) {
      filters.status = status;
    }
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;
    if (sortBy) {
      const allowedSortFields = ['company', 'job_title', 'application_date', 'status', 'created_at'];
      if (allowedSortFields.includes(sortBy)) {
        filters.sortBy = sortBy;
      }
    }
    if (sortOrder && ['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
      filters.sortOrder = sortOrder.toUpperCase();
    }

    const applications = await JobApplication.findByUserId(req.user.userId, filters);
    
    res.json({
      applications,
      total: applications.length
    });
  } catch (error) {
    next(error);
  }
};

const getApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await JobApplication.findById(id, req.user.userId);
    
    if (!application) {
      return res.status(404).json({
        error: 'Application not found'
      });
    }

    res.json({ application });
  } catch (error) {
    next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { company, job_title, application_date, status, notes } = req.body;
    
    const application = await JobApplication.create({
      userId: req.user.userId,
      company,
      jobTitle: job_title,
      applicationDate: application_date,
      status,
      notes: notes || null
    });

    res.status(201).json({
      message: 'Application created successfully',
      application
    });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const { company, job_title, application_date, status, notes } = req.body;

    // Check if application exists
    const existingApplication = await JobApplication.findById(id, req.user.userId);
    if (!existingApplication) {
      return res.status(404).json({
        error: 'Application not found'
      });
    }

    const updates = {};
    if (company !== undefined) updates.company = company;
    if (job_title !== undefined) updates.job_title = job_title;
    if (application_date !== undefined) updates.application_date = application_date;
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const application = await JobApplication.update(id, req.user.userId, updates);

    res.json({
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const application = await JobApplication.delete(id, req.user.userId);
    
    if (!application) {
      return res.status(404).json({
        error: 'Application not found'
      });
    }

    res.json({
      message: 'Application deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await JobApplication.getStats(req.user.userId);
    
    // Format stats for easier frontend consumption
    const formattedStats = validStatuses.reduce((acc, status) => {
      const stat = stats.find(s => s.status === status);
      acc[status] = stat ? parseInt(stat.count) : 0;
      return acc;
    }, {});

    const total = Object.values(formattedStats).reduce((sum, count) => sum + count, 0);

    res.json({
      stats: formattedStats,
      total
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getStats,
  applicationValidation
}; 