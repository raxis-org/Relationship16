/**
 * PMGV診断 - 関係性タイプ定義
 * 4軸による16タイプ分類
 * 
 * 【4軸の定義】
 * P(Passion)軸: Hot(H) vs Cool(C)
 * M(Motive)軸: Equal(E) vs Lean(L)
 * G(Goal)軸:  Value(V) vs Loose(L)
 * V(Value)軸: Sync(S) vs Desync(D)
 * 
 * 【16タイプコード】
 * 例: CEVS = Cool + Equal + Value + Sync
 */

export const RELATION_TYPES = {
  CEVS: {
    code: 'CEVS',
    name: '運命の双子',
    nameEn: 'Soul Twins',
    description: `冷静かつ対等な立場で、お互いの成長を支え合い、価値観を共有する関係です。お互いの違いを理解し、尊重し合うことができます。`,
    strengths: ['深い信頼関係', 'お互いの独立性を尊重', '価値観の共有', '安定した関係性'],
    weaknesses: ['変化に対する保守性', '新しい刺激が少ない可能性'],
    recommendedActivity: '一緒に新しいスキルを学ぶ、または長期的なプロジェクトに取り組む',
    badActivity: '互いの独立性を侵害すること、過度な依存',
    color: '#9b59b6',
    gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
  },

  CEVD: {
    code: 'CEVD',
    name: '知的パートナー',
    nameEn: 'Intellectual Partners',
    description: `冷静で対等な関係でありながら、異なる価値観を持つ関係です。お互いの視点を学びの機会として活用できます。`,
    strengths: ['多様な視点', '建設的な議論', '相互尊重', '知的好奇心'],
    weaknesses: ['意見の食い違い', '価値観の違いによる摩擦'],
    recommendedActivity: '議論やディベート、異なる分野の知識を共有する',
    badActivity: '自分の価値観を押し付けること',
    color: '#3498db',
    gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
  },

  CELS: {
    code: 'CELS',
    name: '穏やかな隣人',
    nameEn: 'Gentle Neighbors',
    description: `冷静で対等な関係で、お互いの独立性を尊重しつつ、適度な距離感を保つ関係です。`,
    strengths: ['健康的な距離感', '安定した関係', '独立性の尊重', '気楽な付き合い'],
    weaknesses: ['深い絆が形成されにくい', '緊急時の頼り合いが弱い'],
    recommendedActivity: '定期的な食事やカフェ、共通の趣味を楽しむ',
    badActivity: '距離を置きすぎて疎遠になること',
    color: '#27ae60',
    gradient: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)'
  },

  CELD: {
    code: 'CELD',
    name: '理性的友人',
    nameEn: 'Rational Friends',
    description: `冷静で対等な関係で、異なる価値観を持ち、適度な距離感を保つ関係です。`,
    strengths: ['客観的なアドバイス', '感情的にならない関係', '多様な視点'],
    weaknesses: ['感情的な繋がりの薄さ', '緊急時の頼り合い'],
    recommendedActivity: 'ビジネスやプロジェクトでの協力、情報交換',
    badActivity: '感情的なサポートを求めすぎること',
    color: '#f39c12',
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
  },

  CLVS: {
    code: 'CLVS',
    name: '癒しの相手',
    nameEn: 'Healing Partner',
    description: `冷静で対等な関係で、リラックスした時間を共有し、価値観を共有する関係です。`,
    strengths: ['癒し効果', '安心感', 'ストレスフリー', '価値観の一致'],
    weaknesses: ['成長への刺激が少ない', '現実逃避の傾向'],
    recommendedActivity: '家でのんびり過ごす、温泉旅行、リラックスできる活動',
    badActivity: '現実から逃避し続けること',
    color: '#e74c3c',
    gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
  },

  CLVD: {
    code: 'CLVD',
    name: '気ままな友達',
    nameEn: 'Casual Friends',
    description: `冷静で対等な関係で、リラックスした時間を共有しつつ、異なる価値観を持つ関係です。`,
    strengths: ['気楽な付き合い', '圧力がない', '自由な関係'],
    weaknesses: ['深い繋がりの欠如', '価値観の違いによる誤解'],
    recommendedActivity: '気軽な食事、共通の趣味、気ままな集まり',
    badActivity: '深い話題を避け続けること',
    color: '#1abc9c',
    gradient: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)'
  },

  CLLS: {
    code: 'CLLS',
    name: '気楽な知り合い',
    nameEn: 'Easygoing Acquaintance',
    description: `冷静で対等な関係で、リラックスした時間を共有し、適度な距離感を保つ関係です。`,
    strengths: ['気楽な付き合い', 'ストレスフリー', '安心感'],
    weaknesses: ['関係の浅さ', '成長への刺激なし'],
    recommendedActivity: '軽い食事、カジュアルな会話、共通の趣味',
    badActivity: '関係を深めようと焦ること',
    color: '#34495e',
    gradient: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)'
  },

  CLLD: {
    code: 'CLLD',
    name: '疎遠な知人',
    nameEn: 'Distant Acquaintance',
    description: `冷静で対等な関係で、リラックスした時間を共有しつつ、異なる価値観と距離感を持つ関係です。`,
    strengths: ['干渉がない', '自由', '気楽'],
    weaknesses: ['繋がりの弱さ', '相互理解の欠如'],
    recommendedActivity: '必要な時だけ連絡を取る、SNSでの交流',
    badActivity: '無理に関係を深めようとすること',
    color: '#95a5a6',
    gradient: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)'
  },

  HEVS: {
    code: 'HEVS',
    name: '情熱的パートナー',
    nameEn: 'Passionate Partners',
    description: `情熱的で対等な関係で、お互いの成長を支え合い、価値観を共有する関係です。`,
    strengths: ['強い絆', '情熱', '共通のビジョン', '高いエネルギー'],
    weaknesses: ['感情の激しさ', '対立の激しさ'],
    recommendedActivity: '情熱的なプロジェクト、スポーツ、冒険的な活動',
    badActivity: '感情に流されすぎて理性を失うこと',
    color: '#e74c3c',
    gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
  },

  HEVD: {
    code: 'HEVD',
    name: '刺激的な相手',
    nameEn: 'Stimulating Partner',
    description: `情熱的で対等な関係で、異なる価値観を持ちながらも、高いエネルギーを共有する関係です。`,
    strengths: ['刺激的な関係', '成長の機会', 'エネルギッシュ'],
    weaknesses: ['意見の衝突', '感情の激しい動き'],
    recommendedActivity: 'ディベート、挑戦的な活動、新しい体験',
    badActivity: '感情的な対立を避けないこと',
    color: '#f39c12',
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
  },

  HELS: {
    code: 'HELS',
    name: '親しい友達',
    nameEn: 'Close Friends',
    description: `情熱的で対等な関係で、リラックスした時間を共有し、価値観を共有する関係です。`,
    strengths: ['親しみやすさ', '楽しい時間', '信頼関係'],
    weaknesses: ['成長への刺激が少ない', '現実逃避'],
    recommendedActivity: '趣味の共有、旅行、楽しい活動',
    badActivity: '現実的な問題を避けること',
    color: '#9b59b6',
    gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
  },

  HELD: {
    code: 'HELD',
    name: '社交的な知り合い',
    nameEn: 'Social Acquaintance',
    description: `情熱的で対等な関係で、リラックスした時間を共有しつつ、異なる価値観を持つ関係です。`,
    strengths: ['楽しい雰囲気', '社交的', '気軽な付き合い'],
    weaknesses: ['深い繋がりの欠如', '表面的な関係'],
    recommendedActivity: 'パーティー、イベント、気軽な集まり',
    badActivity: '深い関係を求めすぎること',
    color: '#3498db',
    gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
  },

  HLVS: {
    code: 'HLVS',
    name: '親密な相手',
    nameEn: 'Intimate Partner',
    description: `情熱的で、どちらかがリードする関係で、価値観を共有する深い絆を持つ関係です。`,
    strengths: ['深い絆', '強い信頼', '情熱', '価値観の共有'],
    weaknesses: ['依存のリスク', 'バランスの崩れ'],
    recommendedActivity: '深い対話、共同作業、情熱的な活動',
    badActivity: '過度な依存、コントロール',
    color: '#e91e63',
    gradient: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)'
  },

  HLVD: {
    code: 'HLVD',
    name: 'エキサイティングな相手',
    nameEn: 'Exciting Partner',
    description: `情熱的で、どちらかがリードする関係で、異なる価値観を持ちながらも刺激的な関係です。`,
    strengths: ['刺激', '成長', 'エネルギッシュ', '面白さ'],
    weaknesses: ['価値観の衝突', '支配と従属の緊張'],
    recommendedActivity: '冒険的な活動、新しい挑戦、刺激的な体験',
    badActivity: '支配しすぎること、反抗しすぎること',
    color: '#ff5722',
    gradient: 'linear-gradient(135deg, #ff5722 0%, #e64a19 100%)'
  },

  HLLS: {
    code: 'HLLS',
    name: '遊び友達',
    nameEn: 'Playmate',
    description: `情熱的で、どちらかがリードする関係で、リラックスした時間を共有し、価値観を共有する関係です。`,
    strengths: ['楽しさ', '気軽さ', '親しみやすさ'],
    weaknesses: ['深い絆の欠如', '成長への刺激なし'],
    recommendedActivity: '遊び、趣味、楽しい活動',
    badActivity: '真剣な話題を避けること',
    color: '#00bcd4',
    gradient: 'linear-gradient(135deg, #00bcd4 0%, #00acc1 100%)'
  },

  HLLD: {
    code: 'HLLD',
    name: '表面的な知り合い',
    nameEn: 'Surface Acquaintance',
    description: `情熱的で、どちらかがリードする関係で、リラックスした時間を共有しつつ、異なる価値観を持つ関係です。`,
    strengths: ['気楽', '楽しい瞬間', '軽い付き合い'],
    weaknesses: ['深い繋がりの欠如', '価値観の違い'],
    recommendedActivity: '気軽な遊び、一時的な楽しみ',
    badActivity: '深い関係を期待すること',
    color: '#607d8b',
    gradient: 'linear-gradient(135deg, #607d8b 0%, #455a64 100%)'
  }
};

/**
 * 配列としてエクスポート
 */
export const relationTypes = Object.values(RELATION_TYPES);

/**
 * コードからタイプを取得
 */
export function getTypeByCode(code) {
  return RELATION_TYPES[code.toUpperCase()] || null;
}

/**
 * 全タイプを取得
 */
export function getAllTypes() {
  return relationTypes;
}

/**
 * タイプのアセットパスを取得
 */
export function getTypeAssetPath(code) {
  return `/assets/${code.toUpperCase()}.png`;
}

export default RELATION_TYPES;
