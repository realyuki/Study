/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/user/:path*',
        destination: 'http://localhost:3000/api/user/:path*'
      }
    ]
  }
}

export default nextConfig
