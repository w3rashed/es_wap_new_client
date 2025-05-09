/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // output: 'standalone',
  
  // Optimize image domains if you're using next/image
  images: {
    domains: ['*'],
    unoptimized: true
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Add trailing slashes to ensure proper routing
  trailingSlash: true,

  // Ensure proper handling of dynamic routes
  async rewrites() {
    return [
      {
        source: '/adminLogin',
        destination: '/adminLogin/',
      },
      {
        source: '/dashboard',
        destination: '/dashboard/',
      },
      {
        source: '/verification/:path*',
        destination: '/verification/:path*/',
      },
    ]
  },
};

module.exports = nextConfig;