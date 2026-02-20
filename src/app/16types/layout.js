export const metadata = {
  title: '16タイプ一覧 | PMGV診断',
  description: 'PMGV診断の16タイプを一覧で紹介。CEVS（運命の双子）からHLLD（表面的な知り合い）まで、4軸（Passion・Motive・Goal・Value）の組み合わせで分類される全16タイプの特性を解説します。',
  keywords: ['PMGV診断', '16タイプ', '相性診断', '関係性タイプ', 'CEVS', 'HEVS', '運命の双子', '情熱的パートナー'],
  alternates: {
    canonical: '/16types',
  },
  openGraph: {
    title: '16タイプ一覧 | PMGV診断',
    description: '4軸16タイプの関係性を一覧で見る。あなたに最も近いタイプを見つけよう。',
    url: 'https://pmgv-diagnosis.vercel.app/16types',
  },
}

export default function TypesLayout({ children }) {
  return children
}
