/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Whop deployment
  output: 'export',
  trailingSlash: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  
};

module.exports = nextConfig;
