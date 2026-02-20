/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 画像最適化設定
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 圧縮設定
  compress: true,
  
  // パワードバイヘッダーを無効化（セキュリティ）
  poweredByHeader: false,
  
  // リダイレクト設定
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
  
  // ヘッダー設定（セキュリティ・キャッシュ）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // 静的アセットのキャッシュ設定
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
