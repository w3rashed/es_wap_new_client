/** @type {import('next').NextConfig} */
const nextConfig = {
  // Option 1: Continue with static export but provide ALL possible iquamaNumber values
  output: 'export',

  // OR Option 2: Switch to server-side rendering if you can't pre-generate all routes
  // output: 'standalone', // or remove the output config entirely to use the default
  
  // Other Next.js configurations
  // ...
};

module.exports = nextConfig;