const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: '../.env' });

const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - MUST BE FIRST - Allow all origins with credentials properly handled
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or return the requesting origin (never use * with credentials)
    callback(null, origin || 'http://localhost:3000');
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma',
    'Expires',
    'X-Cache',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods'
  ],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar', 'Cache-Control'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 0 // Disable preflight caching
};

// Apply CORS to all routes - BEFORE any other middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  const origin = req.headers.origin || 'http://localhost:3000';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '0');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.sendStatus(200);
});

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// Disable all caching middleware
app.use((req, res, next) => {
  const origin = req.headers.origin || 'http://localhost:3000';
  res.set({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires',
    'Access-Control-Allow-Credentials': 'true',
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Last-Modified': new Date().toUTCString(),
    'ETag': false,
    'X-Cache': 'MISS'
  });
  next();
});

// Rate limiting - AFTER CORS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit to prevent blocking during development
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  skip: (req) => {
    // Skip rate limiting for OPTIONS requests
    return req.method === 'OPTIONS';
  }
});
app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Increased limit for development
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  skip: (req) => {
    // Skip rate limiting for OPTIONS requests
    return req.method === 'OPTIONS';
  }
});
app.use('/api/auth/', authLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    nocache: true,
    cors: 'enabled-with-credentials'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Job Application Tracker API',
    version: '1.0.0',
    documentation: '/api/docs',
    nocache: true,
    cors: 'fully-enabled-with-credentials'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🚫 All caching disabled`);
  console.log(`🌐 CORS enabled for ALL origins WITH credentials`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app; 