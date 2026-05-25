/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/books/:path*',
        destination: 'http://localhost:3001/books/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
