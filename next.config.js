/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['supabase.co'],
  },
};

module.exports = nextConfig;

