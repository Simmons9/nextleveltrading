/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nextleveltrading.io'], // Add your domain here
    formats: ['image/avif', 'image/webp'], // Enable optimized formats
  },
  experimental: {
    scrollRestoration: true, // Improves page transitions
  },
};

export default nextConfig;