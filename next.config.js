/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/diagnose/user1',
        has: [
          {
            type: 'cookie',
            key: 'user1Name',
            value: undefined,
          },
        ],
        permanent: false,
        destination: '/diagnose',
      },
    ]
  },
}

module.exports = nextConfig
