/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  },
  // Disable all caching
  swcMinify: false,
  generateEtags: false,
  poweredByHeader: false,
  
  // Disable static optimization
  output: 'standalone',
  
  // Disable image optimization caching
  images: {
    unoptimized: true,
  },
  
  // Disable webpack caching
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    
    // Disable persistent caching
    config.infrastructureLogging = {
      level: 'error',
    };
    
    return config;
  },
  
  // Custom headers to disable browser caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 