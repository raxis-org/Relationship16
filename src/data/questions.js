/**
 * 診断用質問データ
 * 4軸（熱量・重心・目的・同期）を測定する質問群
 */

export const questions = [
  // ========== 熱量軸 (Hot/Cold) ==========
  {
    id: 1,
    axis: 'temperature',
    text: '二人でいる時、感情の起伏はどう感じますか？',
    options: [
      { value: 2, label: 'とても盛り上がり、感情的になれる', type: 'hot' },
      { value: 1, label: '適度に楽しく、穏やか', type: 'neutral' },
      { value: 0, label: '冷静で、感情的にはならない', type: 'cold' },
    ],
  },
  {
    id: 2,
    axis: 'temperature',
    text: '意見が食い違った時、どう対応しますか？',
    options: [
      { value: 2, label: '熱く議論し、お互いの主張をぶつけ合う', type: 'hot' },
      { value: 1, label: '落ち着いて話し合う', type: 'neutral' },
      { value: 0, label: '冷めた目で事実を確認する', type: 'cold' },
    ],
  },
  {
    id: 3,
    axis: 'temperature',
    text: '相手の成功を聞いた時の反応は？',
    options: [
      { value: 2, label: '自分のことのように喜び、祝いたくなる', type: 'hot' },
      { value: 1, label: '素直に祝福する', type: 'neutral' },
      { value: 0, label: '冷静に評価・分析する', type: 'cold' },
    ],
  },

  // ========== 重心軸 (Equal/Lean) ==========
  {
    id: 4,
    axis: 'balance',
    text: '会話の主導権は？',
    options: [
      { value: 2, label: 'お互いに対等に話す', type: 'equal' },
      { value: 1, label: '場面による', type: 'neutral' },
      { value: 0, label: 'どちらかが主導することが多い', type: 'lean' },
    ],
  },
  {
    id: 5,
    axis: 'balance',
    text: '決断をする時、どちらの意見が優先されますか？',
    options: [
      { value: 2, label: '常に話し合い、共通の決断をする', type: 'equal' },
      { value: 1, label: '場面による', type: 'neutral' },
      { value: 0, label: 'どちらかの意見が自然と通る', type: 'lean' },
    ],
  },
  {
    id: 6,
    axis: 'balance',
    text: '支え合いのバランスは？',
    options: [
      { value: 2, label: '常に対等に支え合っている', type: 'equal' },
      { value: 1, label: '時々頼り切ることもある', type: 'neutral' },
      { value: 0, label: '基本的に一方が支える構図', type: 'lean' },
    ],
  },

  // ========== 目的軸 (Value/Loose) ==========
  {
    id: 7,
    axis: 'purpose',
    text: '二人でいる時、何を重視しますか？',
    options: [
      { value: 2, label: '何かを生み出すこと・成長すること', type: 'value' },
      { value: 1, label: 'バランス良く楽しむこと', type: 'neutral' },
      { value: 0, label: '何もしないで心地よく過ごすこと', type: 'loose' },
    ],
  },
  {
    id: 8,
    axis: 'purpose',
    text: '二人の時間をどう使いたいですか？',
    options: [
      { value: 2, label: 'スキルアップや目標達成に使いたい', type: 'value' },
      { value: 1, label: 'その時の気分で決める', type: 'neutral' },
      { value: 0, label: '特に何もせず、ぼーっとしていたい', type: 'loose' },
    ],
  },
  {
    id: 9,
    axis: 'purpose',
    text: 'この関係性に対する将来のイメージは？',
    options: [
      { value: 2, label: '一緒に何か大きなことを成し遂げたい', type: 'value' },
      { value: 1, label: '自然体で変わらずいたい', type: 'neutral' },
      { value: 0, label: '今を楽しめればそれで良い', type: 'loose' },
    ],
  },

  // ========== 同期軸 (Sync/Desync) ==========
  {
    id: 10,
    axis: 'sync',
    text: '価値観や感性は似ていますか？',
    options: [
      { value: 2, label: '驚くほど似ている', type: 'sync' },
      { value: 1, label: '部分部分で似ている', type: 'neutral' },
      { value: 0, label: '基本的に異なる', type: 'desync' },
    ],
  },
  {
    id: 11,
    axis: 'sync',
    text: '同じ話題について、お互いの意見は？',
    options: [
      { value: 2, label: 'ほぼ同じ考え・感想になる', type: 'sync' },
      { value: 1, label: '時々意見が分かれる', type: 'neutral' },
      { value: 0, label: 'よく意見が食い違う', type: 'desync' },
    ],
  },
  {
    id: 12,
    axis: 'sync',
    text: '「空気」を読む能力は？',
    options: [
      { value: 2, label: '言葉にしない気持ちも伝わる', type: 'sync' },
      { value: 1, label: '大体わかる', type: 'neutral' },
      { value: 0, label: '言わないとわからないことも多い', type: 'desync' },
    ],
  },
  {
    id: 13,
    axis: 'sync',
    text: '会話の噛み合い具合は？',
    options: [
      { value: 2, label: '完璧に噛み合い、話が通じる', type: 'sync' },
      { value: 1, label: '大体噛み合う', type: 'neutral' },
      { value: 0, label: '会話がずれることも多い', type: 'desync' },
    ],
  },

  // ========== 追加質問（シンクロ率計算用） ==========
  {
    id: 14,
    axis: 'compatibility',
    text: '二人の「理想の休日の過ごし方」は近いですか？',
    options: [
      { value: 2, label: 'ほぼ同じ', type: 'high' },
      { value: 1, label: '似ている部分もある', type: 'medium' },
      { value: 0, label: '全く異なる', type: 'low' },
    ],
  },
  {
    id: 15,
    axis: 'compatibility',
    text: '「人生で大切にしているもの」は一致しますか？',
    options: [
      { value: 2, label: '驚くほど一致する', type: 'high' },
      { value: 1, label: '一部一致する', type: 'medium' },
      { value: 0, label: '異なる', type: 'low' },
    ],
  },
  {
    id: 16,
    axis: 'compatibility',
    text: '相手の「言わない本音」をどの程度察せますか？',
    options: [
      { value: 2, label: 'ほぼ察せる', type: 'high' },
      { value: 1, label: '時々察せる', type: 'medium' },
      { value: 0, label: 'ほぼ察せない', type: 'low' },
    ],
  },
];

export default questions;
