/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure app directory is enabled
  experimental: {
    appDir: true,
  },
  
  // Disable image optimization for deployment
  images: {
    unoptimized: true,
  },

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable SWC minification if needed
  swcMinify: false,
  
  // Disable webpack cache
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  
  // Disable header for security
  poweredByHeader: false,
  
  // Custom headers to disable browser caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig; 