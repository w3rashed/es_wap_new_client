/** @type {import('next').NextConfig} */
const nextConfig = {
  

  // Optimize image domains if you're using next/image
  images: {
    domains: ["localhost", "homemobilestore.com"],
    unoptimized: true,
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Add trailing slashes to ensure proper routing
  trailingSlash: true,

  // Ensure proper handling of dynamic routes
  async rewrites() {
    return [
      {
        source: "/adminLogin",
        destination: "/adminLogin/",
      },
      {
        source: "/dashboard",
        destination: "/dashboard/",
      },
      {
        source: "/verification/:path*",
        destination: "/verification/:path*/",
      },
      // Add a catch-all route for verification
      {
        source: "/verification/:iquamaNumber",
        destination: "/verification/:iquamaNumber/",
      },
    ];
  },
};

module.exports = nextConfig;
