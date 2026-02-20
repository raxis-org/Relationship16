export const metadata = {
  title: '診断結果 | PMGV診断',
  description: 'あなたと相手の関係性診断結果。16タイプの特性と、二人に最適なコミュニケーション方法、アドバイスを確認できます。',
  keywords: ['診断結果', 'PMGV診断', '関係性分析', '16タイプ結果', '相性結果'],
  alternates: {
    canonical: '/result',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResultLayout({ children }) {
  return children
}
