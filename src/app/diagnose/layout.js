export const metadata = {
  title: '関係性診断 | PMGV診断',
  description: '32問の質問に答えるだけで、あなたと相手の関係性を16タイプに分類。Passion・Motive・Goal・Valueの4軸から、二人に最適なコミュニケーション方法を科学的に診断します。',
  keywords: ['関係性診断', '相性診断', 'PMGV診断', '16タイプ', '無料診断', 'コミュニケーション診断'],
  alternates: {
    canonical: '/diagnose',
  },
  openGraph: {
    title: '関係性診断 | PMGV診断',
    description: '32問で二人の関係性を診断。16タイプの特性から、あなたと相手に最適な接し方をアドバイスします。',
    url: 'https://pmgv-diagnosis.vercel.app/diagnose',
  },
}

export default function DiagnoseLayout({ children }) {
  return children
}
