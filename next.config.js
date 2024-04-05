const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'storage.googleapis.com',
  //       port: '',
  //       pathname: '/path/to/uploads/**',
  //     },
  //   ],
  // },
};

module.exports = withNextIntl(nextConfig);
