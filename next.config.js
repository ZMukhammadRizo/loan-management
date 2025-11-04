/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['supabase.co'],
  },
  typescript: {
    // Allow production builds to successfully complete even if there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

