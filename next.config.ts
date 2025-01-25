/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://pokeapi.co/api/v2/:path*'
      }
    ]
  }
}

module.exports = nextConfig