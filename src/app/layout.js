import './globals.css'

export const metadata = {
  title: 'PMGV診断 | 4軸16タイプ関係性診断',
  description: 'Passion・Motive・Goal・Valueの4軸で二人の関係性を分析。16タイプの特性から、あなたと相手の相性や理想的な関係性を科学的に診断します。恋人、友人、家族、仕事仲間との関係性を深く理解し、より良いコミュニケーションを実現しましょう。',
  keywords: ['PMGV診断', '関係性診断', '相性診断', '16タイプ', 'パーソナリティ診断', 'コミュニケーション', '対人関係', '相性分析'],
  authors: [{ name: 'PMGV診断' }],
  creator: 'PMGV診断',
  publisher: 'PMGV診断',
  metadataBase: new URL('https://pmgv-diagnosis.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://pmgv-diagnosis.vercel.app',
    siteName: 'PMGV診断',
    title: 'PMGV診断 | 4軸16タイプ関係性診断',
    description: 'Passion・Motive・Goal・Valueの4軸で二人の関係性を分析。16タイプの特性から、あなたと相手の相性や理想的な関係性を科学的に診断します。',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PMGV診断 - 4軸16タイプ関係性診断',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PMGV診断 | 4軸16タイプ関係性診断',
    description: 'Passion・Motive・Goal・Valueの4軸で二人の関係性を分析。16タイプで相性を診断します。',
    images: ['/assets/og-image.png'],
    creator: '@pmgv_diagnosis',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // 後でGoogle Search Consoleで取得
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/assets/app_icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/app_icon.png" />
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body>{children}</body>
    </html>
  )
}
