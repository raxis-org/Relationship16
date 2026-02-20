export async function generateMetadata({ params }) {
  const { code } = params
  
  const typeNames = {
    'CEVS': '運命の双子',
    'CEVD': '知的パートナー',
    'CELS': '穏やかな隣人',
    'CELD': '理性的友人',
    'CLVS': '癒しの相手',
    'CLVD': '気ままな友達',
    'CLLS': '気楽な知り合い',
    'CLLD': '疎遠な知人',
    'HEVS': '情熱的パートナー',
    'HEVD': '刺激的な相手',
    'HELS': '親しい友達',
    'HELD': '社交的な知り合い',
    'HLVS': '親密な相手',
    'HLVD': 'エキサイティングな相手',
    'HLLS': '遊び友達',
    'HLLD': '表面的な知り合い',
  }
  
  const typeName = typeNames[code] || '関係性タイプ'
  
  return {
    title: `${typeName} (${code}) | PMGV診断`,
    description: `${typeName}の詳細解説。特性、強み・弱み、おすすめの過ごし方などを紹介。PMGV診断でこのタイプかも？と思った方は必見です。`,
    keywords: [typeName, code, 'PMGV診断', '16タイプ', '関係性タイプ'],
    alternates: {
      canonical: `/16types/${code}`,
    },
    openGraph: {
      title: `${typeName} (${code}) | PMGV診断`,
      description: `${typeName}の詳細解説。特性とアドバイスを確認しよう。`,
      url: `https://pmgv-diagnosis.vercel.app/16types/${code}`,
    },
  }
}

export default function TypeDetailLayout({ children }) {
  return children
}
