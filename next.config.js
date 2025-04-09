/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
  // Enable static exports for GitHub Pages
  output: 'export',
  // Add basePath for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/personal-page' : '',
  // Add assetPrefix for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-page/' : '',
}

module.exports = nextConfig 