/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel
  trailingSlash: true,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  
  // Build configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Server external packages
  serverExternalPackages: [],
};

module.exports = nextConfig;
